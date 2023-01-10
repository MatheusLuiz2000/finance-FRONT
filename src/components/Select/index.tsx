import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Input from "../Input";
import { TextField } from "@mui/material";

const Select: React.FC<any> = ({ label, name, value, onChange, options }) => {
  return (
    <Autocomplete
      disablePortal
      id={name}
      options={options}
      sx={{
        width: `100%`,
        "& .MuiFormControl-root": {
          padding: "0px 0px",
        },
      }}
      getOptionLabel={(option) => option.label ? option.label : ""}
      isOptionEqualToValue={(option, value) => option.label === value}
      name={name}
      value={value}
      defaultValue={value}
      fullWidth
      onChange={onChange}
      required
      renderInput={(params) => (
        <TextField
          sx={{
            "& .MuiFormControl-root": {
              padding: "0px 0px",
            },
            "& .MuiInputBase-input": {
              fontSize: '15px',
              color: '#a1a2af',
              fontFamily: "Poppins, sans-serif"
            },
            backgroundColor: "#ffff",
            borderRadius: "30px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            fontSize: "15px",
            color: "#a1a2af",
            padding: "12px 18px",
            border: "none",
            outline: "none",
            "& fieldset": { border: "none" },
            "& .MuiInputLabel-root": {
              fontWeight: "600",
              fontSize: "18px",
              color: "#1e1e2d",
              marginBottom: "9px",
              fontFamily: "Poppins, sans-serif",
              left: "-10px",
              top: "-16px",
            },
          }}
          {...params}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          label={label}
          hiddenLabel
        />
      )}
    />
  );
};

export default Select;
