import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2" fontWeight="bold">
        404
      </Typography>

      <Typography variant="h6" color="text.secondary" mt={1}>
        Oops! Page not found
      </Typography>

      <Typography variant="body2" color="text.secondary" mt={2}>
        The page you’re looking for doesn’t exist or was moved.
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
