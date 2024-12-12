import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Product Not Found
        </Typography>
        
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          The product you're looking for doesn't exist or has been removed.
        </Typography>

        <Link href="/products" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            Back to Products
          </Button>
        </Link>
      </Box>
    </Container>
  );
}