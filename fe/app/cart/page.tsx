"use client";

import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeItem, updateQuantity } = useCart();

  const normalizePrice = (price: string | number): number => {
    if (typeof price === "number") {
      return price;
    } else {
      return parseFloat(price);
    }
  };

  if (cart.items.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box
          py={4}
          textAlign="center"
        >
          <Typography
            variant="h5"
            gutterBottom
          >
            Your cart is empty
          </Typography>
          <Button
            href="/products"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography
          variant="h4"
          gutterBottom
        >
          Shopping Cart
        </Typography>

        <Grid
          container
          spacing={4}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.product.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            sx={{
                              position: "relative",
                              width: 80,
                              height: 80,
                              mr: 2,
                            }}
                          >
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </Box>
                          <Typography>{item.product.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${normalizePrice(item.product.price).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value > 0) {
                                updateQuantity(item.product.id, value);
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
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                >
                  Subtotal: ${cart.total.toFixed(2)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                >
                  Shipping: Free
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="h6"
                gutterBottom
              >
                Total: ${cart.total.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
