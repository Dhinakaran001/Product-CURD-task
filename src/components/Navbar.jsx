import React from "react";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { NavLink } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    fontWeight: 600,
  },
}));

function Navbar() {
  return (
    <Box>
      <Box
        position="fixed"
        sx={{
          bottom: 0,
          left: { sm: "50%", xs: 0 },
          zIndex: 100,
          transform: { sm: "translate(-50%, -50%)", xs: "translate(-0%, -0%)" },
          backgroundColor: "#fff",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: { sm: "40px", xs: 0 },
          width: { sm: "auto", xs: "100%" },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            px: "10px !important",
          }}
          className="navbar"
        >
          <NavLink to={`/home`}>
            <LightTooltip title="HOME" placement="top">
              <IconButton sx={{ p: 2, color: "#000" }}>
                <HomeRoundedIcon />
              </IconButton>
            </LightTooltip>
          </NavLink>
          <NavLink to={`/products`}>
            <LightTooltip title="PRODECTS" placement="top">
              <IconButton sx={{ p: 2, color: "#000" }}>
                <DashboardRoundedIcon />
              </IconButton>
            </LightTooltip>
          </NavLink>
        </Toolbar>
      </Box>
    </Box>
  );
}

export default Navbar;
