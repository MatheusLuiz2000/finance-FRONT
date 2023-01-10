import React from "react";
import { Grid } from "@mui/material";
import { UilBell } from "@iconscout/react-unicons";
import Star from "../../assets/images/Star 15.png";
import { UilAngleDown } from "@iconscout/react-unicons";

const TopMenu: React.FC<any> = ({ children, user }) => {
  return (
    <Grid container justifyContent="flex-end" mt={2}>
      <Grid
        item
        xs={1}
        sx={{
          backgroundColor: "#ffff",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "20px",
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <UilBell />
        </Grid>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          backgroundColor: "#ffff",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderRadius: "20px",
          padding: '3px 15px',
          marginLeft: '20px'
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <img src={Star} alt="Star" />
          <p>{user.name || "Matheus"}</p>
          <UilAngleDown />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopMenu;
