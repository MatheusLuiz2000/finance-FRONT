import React from "react";
import ButtonMUI from "@mui/material/Button";
import styles from "./Styles.module.scss";
import { Grid } from "@mui/material";
import MasterCard from "../../assets/images/mastercard.svg";
import Chip from "../../assets/images/chip.svg";

const Card: React.FC<any> = ({ numberFinal }) => {
  return (
    <Grid container sx={{ height: "200px" }} m={4}>
      <Grid item xs={12}>
        <Grid justifyContent='center' container sx={{ height: "100%"}}>
          <Grid
            item
            xs={4}
            sx={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '20px',
              background:
                'url("https://image.ibb.co/bVnMrc/g3095.png"), linear-gradient(to right bottom, #fd696b, #fa616e, #f65871, #f15075, #ec4879)',
              '& h2': {
                color: '#ffff'
              }
            }}
          >
            <h2>FINAL {numberFinal}</h2>
          </Grid>
          <Grid
            alignItems="center"
            justifyContent="space-between"
            container
            xs={2}
            p={2}
            sx={{
              flexDirection: "column",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              height: "100%",
              background:
                "linear-gradient(133.78deg, rgba(66, 66, 66, 0.2) 13.28%, rgba(0, 0, 0, 0) 96.86%), #0E0E0E",
            }}
          >
            <img src={MasterCard} />
            <img src={Chip} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Card;
