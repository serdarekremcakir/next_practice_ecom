import { Container, Paper, Skeleton, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function ReviewsLoading() {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} />
              <Skeleton variant="rectangular" height={60} sx={{ mx: 'auto', my: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 9 }}>
            <Skeleton variant="text" width="30%" sx={{ mb: 2 }} />
            {[1, 2, 3].map((i) => (
              <Paper key={i} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Skeleton variant="text" width="20%" />
                  <Skeleton variant="text" width="15%" />
                </Box>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="80%" />
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}