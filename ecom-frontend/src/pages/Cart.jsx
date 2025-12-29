import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCart } from "../features/cart/cartSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = async (productId) => {
    await dispatch(updateCart({ productId, action: "increase" }));
    dispatch(fetchCart());
  };

  const handleDecrease = async (productId) => {
    await dispatch(updateCart({ productId, action: "decrease" }));
    dispatch(fetchCart());
  };

  const handleRemove = async (productId) => {
    await dispatch(updateCart({ productId, action: "remove" }));
    dispatch(fetchCart());
  };

  if (!items || items.length === 0) {
    return (
      <Typography variant="h5" align="center" mt={5}>
        Your cart is empty 🛒
      </Typography>
    );
  }

// 1️⃣ Delivery display text
const estimatedDelivery =
  Number(totalPrice) >= 1000 ? "FREE" : "₹40";

// 2️⃣ Delivery numeric value
const deliveryCharge = Number(totalPrice) >= 1000 ? 0 : 40;

// 3️⃣ Final amount user pays
const grandTotal = Number(totalPrice) + deliveryCharge;


  return (
    <Box className="max-w-7xl mx-auto px-6 py-10">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Shopping Cart
      </Typography>

      <Grid container spacing={4} alignItems="flex-start">
        {/* LEFT — CART ITEMS */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
              pr: 1,
            }}
          >
            {items.map((item) => (
              <Card key={item.product._id} sx={{ mb: 2 }}>
                <Grid container alignItems="center">
                  {/* IMAGE */}
                  <Grid item xs={4}>
                    <Box
                      component={RouterLink}
                      to={`/products/${item.product._id}`}
                      sx={{
                        width: "100%",
                        height: 120,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        textDecoration: "none",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.product?.image?.url}
                        alt={item.product.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </Grid>

                  {/* DETAILS */}
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6">
                        {item.product.name}
                      </Typography>

                      <Typography color="text.secondary" mb={1}>
                        ₹{item.price}
                      </Typography>

                      <Box display="flex" alignItems="center">
                        <IconButton
                          onClick={() => handleDecrease(item.product._id)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove />
                        </IconButton>

                        <Typography mx={1}>{item.quantity}</Typography>

                        <IconButton
                          onClick={() => handleIncrease(item.product._id)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Add />
                        </IconButton>

                        <IconButton
                          color="error"
                          sx={{ ml: 2 }}
                          onClick={() => handleRemove(item.product._id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* RIGHT — ORDER SUMMARY (REMAINS WIDTH) */}
        <Grid item xs={12} md={4} >
          <Card sx={{ position: "sticky", top: 100 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Order Summary
              </Typography>

              <Divider sx={{ my: 2 }} />

    <Box display="flex" justifyContent="space-between" mb={1}>
  <Typography color="text.secondary">Items</Typography>
  <Typography>{totalItems}</Typography>
</Box>

<Box display="flex" justifyContent="space-between" mb={1}>
  <Typography color="text.secondary">Subtotal</Typography>
  <Typography>₹{totalPrice}</Typography>
</Box>

<Box display="flex" justifyContent="space-between" mb={1}>
  <Typography color="text.secondary">Delivery</Typography>
  <Typography color="text.primary">
    {estimatedDelivery}
  </Typography>
</Box>


              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">
                  ₹{grandTotal}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                textAlign="center"
                mt={1}
              >
                🔒 Secure Checkout
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
