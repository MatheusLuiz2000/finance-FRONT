import React from "react";
import styles from "./InputStyles.module.scss";

const Input: React.FC<any> = ({ label, name, value, maxLength, pattern, type, onChange, ...rest }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          id={name}
          className={styles.input}
          defaultValue={value}
          rows={5}
          onChange={onChange}
        />
      ) : (
        <input
          name={name}
          pattern={pattern}
          maxLength={maxLength}
          value={value}
          defaultValue={value}
          id={name}
          className={styles.input}
          type={type}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
