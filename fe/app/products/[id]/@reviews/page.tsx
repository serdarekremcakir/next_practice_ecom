import {
  Box,
  Typography,
  Rating,
  Divider,
  Paper,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Review } from "@/lib/types";
import { getServerSession } from "next-auth";
import ReviewHeader from "@/components/ReviewHeader";
import { authOptions } from "@/lib/authOptions";

export default async function ReviewsSection({
  params,
}: {
  params: { id: string };
}) {
  // Server side session
  const session = await getServerSession(authOptions);

  const fetchReviews = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      const res = await fetch(
        `http://localhost:3001/api/reviews/products/${params.id}`
      );
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      return data;
    } catch (error) {
      const defaultMessage = "Failed to fetch reviews";
      const errorMessage =
        error instanceof Error
          ? error.message + defaultMessage
          : defaultMessage;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const reviews = await fetchReviews();

  const averageRating = reviews.length
    ? reviews.reduce((acc: number, r: Review) => acc + r.rating, 0) /
      reviews.length
    : 0;

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 3 }}>
        <ReviewHeader
          session={session}
          id={params?.id}
        />

        <Divider sx={{ my: 2 }} />

        <Grid
          container
          spacing={2}
        >
          {reviews.length > 0 ? (
            <>
              <Grid size={{ xs: 12, md: 3 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    gutterBottom
                  >
                    {averageRating.toFixed(1)}
                  </Typography>
                  <Rating
                    value={averageRating}
                    readOnly
                    precision={0.5}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Based on {reviews.length} reviews
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 9 }}>
                {reviews.map((review: Review) => (
                  <Paper
                    key={review.id}
                    sx={{ p: 2, mb: 2 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                        >
                          {review.userName}
                        </Typography>
                        <Rating
                          value={review.rating}
                          readOnly
                          size="small"
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {review.comment}
                    </Typography>
                  </Paper>
                ))}
              </Grid>
            </>
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography
                color="text.secondary"
                align="center"
              >
                No reviews yet. Be the first to review this product!
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}
