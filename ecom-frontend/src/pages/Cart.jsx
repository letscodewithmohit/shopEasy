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
import { Add, Remove, Delete, ArrowBack } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCart, clearCart } from "../features/cart/cartSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Cart state from Redux
  const { items, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  // 🔹 Fetch cart when page loads
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // 🔹 Increase product quantity
  const handleIncrease = async (productId) => {
    await dispatch(updateCart({ productId, action: "increase" }));
    dispatch(fetchCart()); // refresh cart
  };

  // 🔹 Decrease product quantity
  const handleDecrease = async (productId) => {
    await dispatch(updateCart({ productId, action: "decrease" }));
    dispatch(fetchCart());
  };

  // 🔹 Remove single product
  const handleRemove = async (productId) => {
    await dispatch(updateCart({ productId, action: "remove" }));
    dispatch(fetchCart());
    toast.success("Item removed from cart");
  };

  // 🔹 Clear entire cart
  const handleClearCart = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to remove all items from cart?"
    );
    if (!confirmClear) return;

    await dispatch(clearCart());
    dispatch(fetchCart());
  };

  // 🔴 UX GUARD: Empty cart UI
  if (!items || items.length === 0) {
    return (
      <Box textAlign="center" mt={6}>
        <Typography variant="h5" mb={2}>
          Your cart is empty 🛒
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </Button>
      </Box>
    );
  }

  // 🔹 Delivery logic
  const deliveryCharge = Number(totalPrice) >= 1000 ? 0 : 40;
  const estimatedDelivery = deliveryCharge === 0 ? "FREE" : "₹40";

  // 🔹 Final payable amount
  const grandTotal = Number(totalPrice) + deliveryCharge;

  return (
    <Box className="max-w-7xl mx-auto px-6 py-10">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Shopping Cart
      </Typography>

      {/* Continue shopping */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/products")}
        sx={{ mb: 3 }}
      >
        Continue Shopping
      </Button>

      <Grid container spacing={4} alignItems="flex-start">
        {/* LEFT — CART ITEMS */}
        <Grid item xs={12} md={8}>
          <Box sx={{ maxHeight: "70vh", overflowY: "auto", pr: 1 }}>
            {items.map((item) => (
              <Card key={item.product._id} sx={{ mb: 2 }}>
                <Grid container alignItems="center">
                  {/* Product Image */}
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
                        sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </Box>
                  </Grid>

                  {/* Product Details */}
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6">
                        {item.product.name}
                      </Typography>

                      <Typography color="text.secondary" mb={1}>
                        ₹{item.price}
                      </Typography>

                      {/* Quantity Controls */}
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

        {/* RIGHT — ORDER SUMMARY */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: 100 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Order Summary
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Items</Typography>
                <Typography>{totalItems}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>₹{totalPrice}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Delivery</Typography>
                <Typography>{estimatedDelivery}</Typography>
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
                <Typography fontWeight="bold">₹{grandTotal}</Typography>
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

              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleClearCart}
              >
                Clear Cart
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
