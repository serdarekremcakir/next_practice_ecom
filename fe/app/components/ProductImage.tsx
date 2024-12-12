'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import {  Paper } from '@mui/material';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const ProductImage = memo(function ProductImage({ src, alt, priority = false }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Paper 
      elevation={1}
      sx={{ 
        position: 'relative',
        width: '100%',
        paddingTop: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.default'
      }}
    >
      <Image
        src={imageError ? DEFAULT_IMAGE : src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ 
          objectFit: 'cover',
        }}
        onError={() => setImageError(true)}
        loading={priority ? 'eager' : 'lazy'}
      />
    </Paper>
  );
});

export default memo(ProductImage);