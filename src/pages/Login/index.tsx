import React, { useState } from "react";
import styles from "./LoginStyles.module.scss";
import Input from "../../components/Input";
import { Grid } from "@mui/material";
import Button from "../../components/Button";
import { useFormik } from "formik";
import { ILoginUser } from "../../types";
import { makeLogin } from "../../services/login";
import { setUser } from "../../store";

const LoginPage: React.FC<any> = ({ data }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const make = await makeLogin({ email, password });

    if (make.status === 200) {
      setUser(make.data);
      return (window.location.href = "/dashboard");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentLeft} />
      <form className={styles.content} onSubmit={onSubmit}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <h2>Bem vindo ao Finance</h2>
          </Grid>
        </Grid>
        <Grid container mt={4} justifyContent="center">
          <Grid item xs={8}>
            <Input
              name="email"
              label="Digite seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container mt={4} justifyContent="center">
          <Grid item xs={8}>
            <Input
              name="password"
              label="Digite sua senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" mt={8}>
          <Grid item xs={8}>
            <Button type="submit" fullWidth>
              Entrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginPage;
