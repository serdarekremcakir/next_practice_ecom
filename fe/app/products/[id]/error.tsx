'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Product page error:', error);
  }, [error]);

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
          Oops! Something went wrong
        </Typography>
        
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          We encountered an error while loading the product details.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => reset()}>
            Try Again
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => router.push('/products')}
          >
            Back to Products
          </Button>
        </Box>
      </Box>
    </Container>
  );
}