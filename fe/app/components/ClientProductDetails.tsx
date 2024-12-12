"use client";

import {
  Box,
  Grid2,
  Typography,
  Button,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import ProductImage from "./ProductImage";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/types";
import { useState } from "react";

interface ClientProductDetailsProps {
  product: Product;
}

export default function ClientProductDetails({
  product,
}: ClientProductDetailsProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  return (
    <Box py={4}>
      <Grid2
        container
        spacing={4}
      >
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            priority
          />
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
            >
              {product.name}
            </Typography>

            <Typography
              variant="h5"
              color="primary"
              gutterBottom
            >
              ${price.toFixed(2)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
              >
                Category: {product.category}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
              >
                Stock: {product.stock} units
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  size="small"
                  disabled={quantity === 1}
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  <Remove />
                </IconButton>
                <TextField
                  size="small"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      setQuantity(value);
                    }
                  }}
                  sx={{ width: 60, mx: 1 }}
                  inputProps={{
                    min: 1,
                    style: { textAlign: "center" },
                  }}
                />
                <IconButton
                  size="small"
                  disabled={quantity === product.stock}
                  onClick={() =>
                    setQuantity((prev) =>
                      prev < product.stock ? prev + 1 : product.stock
                    )
                  }
                >
                  <Add />
                </IconButton>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
              />

              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ShoppingCart />}
                disabled={product.stock === 0}
                onClick={() => addItem(product, quantity)}
                fullWidth
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
