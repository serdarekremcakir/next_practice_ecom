import { Box, Paper, Typography, Grid2, Tabs, Tab } from '@mui/material';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/authOptions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User profile and settings',
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Grid2 container spacing={3} alignItems="center">
        <Grid2 size={{
          xs:12,
        }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={0}>
              <Tab label="Profile" component={Link} href="/profile" />
              <Tab label="My Reviews" component={Link} href="/profile/reviews" />
            </Tabs>
          </Box>
        </Grid2>

        <Grid2 size={{
          xs: 12,
          md: 4
        }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto'
            }}
          >
            <Typography variant="h3" color="white">
              {session.user.name?.[0]}
            </Typography>
          </Box>
        </Grid2>

        <Grid2 size={{
          xs: 12,
          md: 8
        }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {session.user.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {session.user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since: {new Date(session.user.createdAt || Date.now()).toLocaleDateString()}
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  );
}