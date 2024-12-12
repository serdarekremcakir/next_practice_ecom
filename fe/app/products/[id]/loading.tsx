import { Box, Container, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function ProductLoading() {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Grid
          container
          spacing={4}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ borderRadius: 2 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Skeleton
                variant="text"
                width="80%"
                height={60}
              />

              <Skeleton
                variant="text"
                width="30%"
                height={40}
                sx={{ mt: 2 }}
              />

              <Box sx={{ mt: 4 }}>
                <Skeleton
                  variant="text"
                  width="100%"
                />
                <Skeleton
                  variant="text"
                  width="100%"
                />
                <Skeleton
                  variant="text"
                  width="80%"
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Skeleton
                  variant="text"
                  width="40%"
                />
                <Skeleton
                  variant="text"
                  width="30%"
                />
              </Box>

              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ mt: 4, borderRadius: 1 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
