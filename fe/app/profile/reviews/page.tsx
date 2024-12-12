import { Box, Paper, Typography, Tabs, Tab, Rating } from '@mui/material';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { authOptions } from '@/lib/authOptions';
import { Review } from '@/lib/types';

async function getUserReviews(userId: string, token: string) {
  try {
    const res = await fetch(`http://localhost:3001/api/reviews/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return [];
  }
}

export default async function ProfileReviewsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  const reviews = await getUserReviews(session.user.id, session.user.token);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={1}>
          <Tab label="PROFILE" component={Link} href="/profile" />
          <Tab label="MY REVIEWS" component={Link} href="/profile/reviews" />
        </Tabs>
      </Box>

      <Typography variant="h6" gutterBottom>
        Your Reviews ({reviews.length})
      </Typography>

      {reviews.map((review: Review) => (
        <Paper
          key={review.id}
          sx={{
            p: 3,
            mb: 2,
            display: 'flex',
            gap: 3
          }}
          elevation={1}
        >
          <Box sx={{ width: 100, height: 100, position: 'relative', flexShrink: 0 }}>
            <Image
              src={review.productImage || ''}
              alt={review.productName || 'Product Image'}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Link 
              href={`/products/${review.productId}`}
              style={{ 
                textDecoration: 'none', 
                color: 'inherit'
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                {review.productName}
              </Typography>
            </Link>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({review.rating}/5)
              </Typography>
            </Box>

            <Typography sx={{ mb: 2 }}>
              {review.comment}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Posted on {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      ))}

      {reviews.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            You haven't written any reviews yet.
          </Typography>
        </Paper>
      )}
    </>
  );
}