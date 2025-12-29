import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
