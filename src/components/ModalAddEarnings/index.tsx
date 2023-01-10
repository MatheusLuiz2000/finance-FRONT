import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import Input from "../Input";
import CurrencyInput from "../CurrencyInput";
import Button from "../Button";
import "react-tabs/style/react-tabs.css";
import { createTransaction } from "../../services/transaction";
import { toast } from "react-toastify";
import { months, years } from "../../constants";
import { styleSelect } from "../../util/styles";
import { createEarning } from "../../services/earnings";

const ModalAddEarnings: React.FC<any> = ({ open, setOpen }) => {
  const handle = () => {
    setOpen((prev) => !prev);
  };

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    height: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    p: 2,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const create = await createEarning({
      amount: amount.replaceAll(",", "."),
      description,
      year,
      month
    });

    if (create.status === 200) {
      reset();
      return toast.success("Criado com sucesso!");
    }
  };

  const reset = () => {
    setAmount("");
    setDescription("");
  };

  return (
    <Modal
      open={open}
      onClose={handle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid
          container
          p={2}
          sx={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="body1"
                mt={2}
                sx={{
                  fontSize: "25px",
                  fontWeight: "700",
                  textAlign: "center",
                  fontFamily: "Poppins",
                }}
                mb={3}
              >
                Adicionar Receita
              </Typography>
              <Grid container justifyContent="center" columnSpacing={6}>
                <Grid item xs={6}>
                  <CurrencyInput
                    name={`amount`}
                    label="Digite o valor"
                    value={amount}
                    onValueChange={(value) => {
                      setAmount(value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    name={`descricao`}
                    label="Descricao"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                  />
                </Grid>
              </Grid>
              <Grid container mt={4} justifyContent="center" columnSpacing={6}>
                <Grid item xs={6}>
                  <Select
                    sx={{
                      ...styleSelect,
                      width: '100%',
                      "& .MuiSelect-select": {
                        textAlign: "left",
                      },
                    }}
                    id="year"
                    value={year}
                    label="Ano"
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                  >
                    {years.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    sx={{
                      ...styleSelect,
                      width: '100%'
                    }}
                    id="month"
                    value={month}
                    label="Mês"
                    onChange={(e) => {
                      setMonth(e.target.value);
                    }}
                  >
                    {months.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container mt={3} mr={4} justifyContent="flex-end">
                <Grid item xs={1}>
                  <Button type="submit">Salvar</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalAddEarnings;
