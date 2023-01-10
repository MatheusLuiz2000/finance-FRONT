import React from "react";
import ButtonMUI from '@mui/material/Button';
import styles from './styles';

const Button: React.FC<any> = ({ children, error, secondarySX,  ...rest }) => {
  return (
    <ButtonMUI sx={{
      ...styles,
      ...secondarySX,
      ...(error && {backgroundColor: '#e74c3c', color: '#ffff', border: 'none'})
    }} variant="outlined" {...rest}>{children}</ButtonMUI>
  );
};

export default Button;
