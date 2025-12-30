import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) {
    return <Typography align="center">Loading orders...</Typography>;
  }

  if (orders.length === 0) {
    return (
      <Typography align="center" mt={5}>
        You have no orders yet 📦
      </Typography>
    );
  }

  return (
    <Box className="max-w-6xl mx-auto px-6 py-10">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Orders
      </Typography>

      {orders.map((order) => (
        <Card key={order._id} sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="bold">
                Order #{order._id.slice(-6)}
              </Typography>
              <Typography color="text.secondary">
                {new Date(order.createdAt).toDateString()}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography>
              Total: <b>₹{order.totalAmount}</b>
            </Typography>

            <Typography>
              Payment: {order.paymentMethod}
            </Typography>

            <Typography>
              Status: <b>{order.orderStatus || "Placed"}</b>
            </Typography>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyOrders;
