import React, { useMemo } from "react";
import { Grid } from "@mui/material";
import { getUser } from "../../store";
import Menu from "../Menu";
import TopMenu from "../TopMenu";
import { containerStyles, menuContainer } from "./ContentStyles";

const Content: React.FC<any> = ({ children, title }) => {
  const user = useMemo(() => {
    const get = getUser();

    return get;
  }, []);

  return (
    <Grid container sx={containerStyles} columnSpacing={4}>
      <Grid item xs={2} sx={menuContainer}>
        <Menu user={user} />
      </Grid>
      <Grid item xs={10} sx={{paddingRight: '32px'}}>
        <Grid container mt={4}>
          <Grid item xs={12}>
            <Grid
              container
              mb={5}
              sx={{ "& h2": { fontSize: "32px", color: "#1E1E2D" } }}
            >
              <h2>{title}</h2>
            </Grid>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Content;
