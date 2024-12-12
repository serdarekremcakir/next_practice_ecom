"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Snackbar,
  Box,
  CardActionArea,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { type Product } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [imageError, setImageError] = useState(false);

  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  const { addItem } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      addItem(product);
      setShowSnackbar(true);
    } catch (error: unknown) {
      const defaultMessage = "Failed to add item to cart";
      const errorMessage =
        error instanceof Error
          ? error.message + defaultMessage
          : defaultMessage;
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        opacity: isLoading ? 0.7 : 1,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      <CardActionArea onClick={handleQuickView}>
        <Box sx={{ position: "relative", paddingTop: "100%" }}>
          <CardMedia
            component="div"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "grey.100",
            }}
          >
            <Image
              src={imageError ? DEFAULT_IMAGE : product.image}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              onError={() => setImageError(true)}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading={priority ? "eager" : "lazy"}
            />
          </CardMedia>
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            noWrap
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            sx={{ mt: 2 }}
          >
            ${price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
          fullWidth
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardActions>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Added to cart successfully!"
      />
    </Card>
  );
}

export default memo(ProductCard);
