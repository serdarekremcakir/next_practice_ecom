import { Suspense } from "react";
import { type FilterParams, type Product } from "@/lib/types";
import ProductList from "@/components/ProductList";
import SearchFilters from "@/components/SearchFilters";
import { Box, Container, Typography } from "@mui/material";
import { Metadata } from "next";

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    price:
      typeof product.price === "string"
        ? parseFloat(product.price)
        : product.price,
    stock:
      typeof product.stock === "string"
        ? parseInt(product.stock, 10)
        : product.stock,
  };
}

async function getProducts(params: FilterParams) {
  try {
    const searchParams = new URLSearchParams();

    if (params.category) searchParams.append("category", params.category);
    if (params.minPrice)
      searchParams.append("minPrice", params.minPrice.toString());
    if (params.maxPrice)
      searchParams.append("maxPrice", params.maxPrice.toString());
    if (params.sort) searchParams.append("sort", params.sort);
    if (params.search) searchParams.append("search", params.search);
    if (params.page) searchParams.append("page", params.page.toString());


    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${searchParams}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    // Normalize the data
    const normalizedProducts = result.data.map(normalizeProduct);

    return {
      data: normalizedProducts,
      page: result.page,
      limit: result.limit,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [], page: 1, limit: 12 };
  }
}

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our products',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters: FilterParams = {
    category: searchParams.category?.toString(),
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sort: searchParams.sort as FilterParams["sort"],
    search: searchParams.search?.toString(),
    page: searchParams.page ? Number(searchParams.page) : 1,
  };

  const { data: products, page, limit } = await getProducts(filters);

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
        >
          Products
        </Typography>

        <SearchFilters initialFilters={filters} />

        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList
            products={products}
            hasMore={products.length === limit}
            currentPage={page}
          />
        </Suspense>
      </Box>
    </Container>
  );
}
