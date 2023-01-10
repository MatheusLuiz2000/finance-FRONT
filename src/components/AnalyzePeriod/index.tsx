import { Grid, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { months, years } from "../../constants";
import getMonth from "../../util/getMonth";
import { styleSelect } from "../../util/styles";
// import Select from '../Select';

export default function AnalyzePeriod({ year, setYear, month, setMonth, sumValues}) {
  return (
    <Grid container>
      <Grid container justifyContent="space-between">
        <Grid item xs={4}>
          {sumValues ? sumValues : null}
        </Grid>
        <Grid item xs={1} mb={6}>
          <Select
            sx={styleSelect}
            id="year"
            value={year}
            label="Ano para filtrar"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            {years.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          borderBottom: "2px solid #1e1e2d",
          borderRadius: "4px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        {months.map((item) => {
          return (
            <Grid
              className={item === month ? "active" : ""}
              onClick={() => setMonth(item)}
              item
              xs={1}
              sx={{
                backgroundColor: "#ffff",
                cursor: 'pointer',
                "&.active": { backgroundColor: "#1e1e2d", color: "#ffff" },
                fontFamily: "Questrial",
                fontSize: "16px",
                borderRadius: "4px",
                fontWeight: "500",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
