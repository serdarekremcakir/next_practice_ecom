'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Product } from '@/lib/types';
import ProductCard from './ProductCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useInView } from 'react-intersection-observer';
import {  useSearchParams } from 'next/navigation';

interface ProductListProps {
  products: Product[];
  hasMore: boolean;
  currentPage: number;
}

export default function ProductList({ products: initialProducts, hasMore: initialHasMore, currentPage }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(currentPage);
  const searchParams = useSearchParams();

  const { ref, inView } = useInView({
    threshold: 0
  });

  const loadMoreProducts = async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const nextPage = page + 1;
      
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', nextPage.toString());

      const response = await fetch(`http://localhost:3001/api/products?${params.toString()}`);
      const data = await response.json();

      setProducts(prevProducts => [...prevProducts, ...data.data]);
      setHasMore(data.data.length === data.limit);
      setPage(nextPage);

      window.history.pushState({}, '', `/products?${params.toString()}`);
    } catch (error : unknown) {
      const defaultMessage = "Error loading more products";
      const errorMessage =
        error instanceof Error
          ? error.message + defaultMessage
          : defaultMessage;
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const filterParams = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreProducts();
    }
  }, [inView]);

  useEffect(() => {
    const currentFilters = filterParams();
    if (currentFilters) {
      setProducts(initialProducts);
      setHasMore(initialHasMore);
      setPage(1);
    }
  }, [filterParams()]);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid 
            key={product.id}
            size={{ 
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3
            }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
      {hasMore && (
        <Box 
          ref={ref} 
          sx={{ 
            height: '100px', 
            mt: 2,
            visibility: 'hidden' 
          }} 
        />
      )}

      {isLoading && (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          Loading more products...
        </Box>
      )}
    </Box>
  );
}