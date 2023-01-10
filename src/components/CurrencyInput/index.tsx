import React from "react";
import styles from "./InputStyles.module.scss";
import CurrencyInput2 from 'react-currency-input-field';

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

const CurrencyInput: React.FC<any> = ({
  label,
  name,
  formik,
  type,
  value,
  onValueChange,
  ...rest
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <CurrencyInput2
        name={name}
        id={name}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        decimalsLimit={2}
        className={styles.input}
        defaultValue={value}
        onValueChange={onValueChange}
        value={value}
      />
    </div>
  );
};

export default CurrencyInput;
