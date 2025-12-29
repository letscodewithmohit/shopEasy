import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { clearCart } from "../features/cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, totalItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  // 🔹 Preview calculation (UI only)
const deliveryCharge = Number(totalPrice) >= 1000 ? 0 : 40;
const grandTotal = Number(totalPrice) + deliveryCharge;


  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });



  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      // basic validation
      for (let key in shippingAddress) {
        if (!shippingAddress[key]) {
          return alert("Please fill all shipping details");
        }
      }

      const res = await api.post("/orders", {
        shippingAddress,
        paymentMethod: paymentMethod.toUpperCase(),
      });

  navigate("/order-success", {
  state: {
    itemsPrice: res.data.order.itemsPrice,
    deliveryCharge: res.data.order.deliveryCharge,
    totalPaid: res.data.order.totalAmount,
  },
});


      dispatch(clearCart());
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Checkout
      </Typography>

      <Grid container spacing={4} alignItems="flex-start">
        {/* LEFT — SHIPPING + PAYMENT */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shipping Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Address"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Pincode"
                    name="pincode"
                    value={shippingAddress.pincode}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>

              <FormControl>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Online Payment (Coming Soon)"
                    disabled
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT — ORDER SUMMARY */}
        <Grid item xs={12} md={4} className="w-full">
          <Card sx={{ position: "sticky", top: 100 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Order Summary
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography color="text.secondary">Items</Typography>
                <Typography>{totalItems}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography>₹{totalPrice}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1.5}>
                <Typography color="text.secondary">Delivery</Typography>
                <Typography>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
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
                sx={{ mt: 3 }}
                onClick={handlePlaceOrder}
                disabled={items.length === 0}
              >
                Place Order
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
    </div>
  );
};

export default Checkout;
