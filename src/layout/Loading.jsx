import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translat(-50%, -50%)",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Loading;
