'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Button,
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FilterParams, SortOption } from '@/lib/types';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchFiltersProps {
  initialFilters: FilterParams;
}

export default function SearchFilters({ initialFilters }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterParams>({
    search: initialFilters.search || '',
    category: initialFilters.category || 'all',
    minPrice: initialFilters.minPrice || undefined,
    maxPrice: initialFilters.maxPrice || undefined,
    sort: initialFilters.sort || undefined
  });

  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);



  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    params.delete('page');
    router.push(`/products?${params.toString()}`);
  }, [debouncedSearch, filters.category, filters.sort, filters.minPrice, filters.maxPrice]);

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Search Products"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category || 'all'}
              label="Category"
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <TextField
            fullWidth
            type="number"
            label="Min Price"
            value={filters.minPrice || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <TextField
            fullWidth
            type="number"
            label="Max Price"
            value={filters.maxPrice || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sort || undefined}
              label="Sort By"
              onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value as SortOption }))}
            >
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="name-asc">Name: A to Z</MenuItem>
              <MenuItem value="name-desc">Name: Z to A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={() => {
            setFilters({
              search: '',
              category: 'all',
              minPrice: undefined,
              maxPrice: undefined,
              sort: 'name-asc'
            });
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Paper>
  );
}