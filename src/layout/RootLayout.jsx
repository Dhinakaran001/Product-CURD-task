import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <Box sx={{ margin: { xs: "0px", md: "0px 200px" } }}>
      {/* <Navbar /> */}
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      />
    </Box>
  );
}

export default RootLayout;
