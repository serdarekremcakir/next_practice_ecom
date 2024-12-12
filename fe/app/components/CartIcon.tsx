"use client";

import { useState } from "react";
import {
  Badge,
  IconButton,
  Popover,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { ShoppingCart, Close } from "@mui/icons-material";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function CartIcon() {
  const { cart, removeItem } = useCart();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
      >
        <Badge
          badgeContent={cart.items.length}
          color="error"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
          >
            Cart ({cart.items.length} items)
          </Typography>

          <List>
            {cart.items.map((item) => (
              <ListItem
                key={item.product.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Close />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    alt={item.product.name}
                    src={item.product.image}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.product.name}
                  secondary={`$${item.product.price} x ${item.quantity}`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="subtitle1"
            gutterBottom
          >
            Total: ${cart.total.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              router.push("/cart");
              handleClose();
            }}
          >
            View Cart
          </Button>
        </Box>
      </Popover>
    </>
  );
}
