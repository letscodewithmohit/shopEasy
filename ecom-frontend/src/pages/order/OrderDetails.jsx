import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../features/order/orderSlice";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleOrder: order, loading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">{error}</p>;
  if (!order) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* 🔙 Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/orders")}
        sx={{ mb: 3 }}
      >
        Back to My Orders
      </Button>

      {/* Order Header */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Order #{order._id}
        </Typography>
        <Typography color="text.secondary">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </Typography>

        <Chip
          label={order.isDelivered ? "Delivered" : "Processing"}
          color={order.isDelivered ? "success" : "warning"}
          sx={{ mt: 1 }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* LEFT — PRODUCTS */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Ordered Items
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {order.orderItems.map((item) => (
                <Box
                  key={item.product}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/products/${item.product}`)
                  }
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                    />
                    <Box>
                      <Typography fontWeight="medium">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.quantity}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography fontWeight="medium">
                    ₹{item.price * item.quantity}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* RIGHT — SUMMARY */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: 100 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Order Summary
              </Typography>

              <Divider sx={{ my: 2 }} />

              <SummaryRow label="Items Price" value={`₹${order.itemsPrice}`} />
              <SummaryRow
                label="Delivery"
                value={
                  order.deliveryCharge === 0
                    ? "FREE"
                    : `₹${order.deliveryCharge}`
                }
              />

              <Divider sx={{ my: 2 }} />

              <SummaryRow
                label="Total Paid"
                value={`₹${order.totalAmount}`}
                bold
              />

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight="bold" gutterBottom>
                Shipping Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.address}, {order.shippingAddress.city}
                <br />
                {order.shippingAddress.pincode}
                <br />
                📞 {order.shippingAddress.phone}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight="bold">
                Payment Method
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.paymentMethod}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const SummaryRow = ({ label, value, bold }) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography fontWeight={bold ? "bold" : "normal"}>
      {label}
    </Typography>
    <Typography fontWeight={bold ? "bold" : "normal"}>
      {value}
    </Typography>
  </Box>
);

export default OrderDetail;
