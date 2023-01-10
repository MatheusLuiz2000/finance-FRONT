import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, Typography } from "@mui/material";
import Input from "../Input";
import CurrencyInput from "../CurrencyInput";
import { getBanks, getCards, getCategorys, getUser } from "../../store";
import Select from "../Select";
import Button from "../Button";
import "react-tabs/style/react-tabs.css";
import { createTransaction } from "../../services/transaction";
import { toast } from "react-toastify";

const ModalAddPurchases: React.FC<any> = ({ open, setOpen }) => {
  const handle = () => {
    setOpen((prev) => !prev);
  };

  const categorys = getCategorys();
  const banks = getBanks();
  const cards = getCards();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [dateSpent, setDateSpent] = useState("");
  const [description, setDescription] = useState("");
  const [opcaoFinanceiro, setOpcaoFinanceiro] = useState("cartao");
  const [opcaoId, setOpcaoId] = useState("");

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    p: 2,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const create = await createTransaction({
      amount: amount.replaceAll(",", "."),
      category,
      dateSpent,
      description,
      ...(opcaoFinanceiro === "cartao" && { cardId: opcaoId }),
      ...(opcaoFinanceiro === "banco" && { bankId: opcaoId }),
    });

    if (create.status === 200) {
      reset();
      return toast.success("Criado com sucesso!");
    }
  };

  const reset = () => {
    setAmount("");
    setCategory("");
    setDateSpent("");
    setDescription("");
  }

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
            height: 700,
            overflowY: "auto",
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
                Adicionar Gasto.
              </Typography>
              <Grid container justifyContent="center" columnSpacing={6}>
                <Grid item xs={6}>
                  <CurrencyInput
                    name={`amount`}
                    label="Digite o valor"
                    value={amount}
                    onValueChange={(value, name) => {
                      setAmount(value)
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    name={`dateSpent`}
                    label="Data do gasto"
                    value={dateSpent}
                    onChange={(e) => setDateSpent(e.target.value)}
                    type="date"
                  />
                </Grid>
              </Grid>
              <Grid container mt={4} justifyContent="center">
                <Grid item xs={12}>
                  <Input
                    name={`description`}
                    label="Descricao do gasto"
                    value={description}
                    type="textarea"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container mt={7} justifyContent="center" columnSpacing={6}>
                <Grid item xs={6}>
                  {categorys.length && (
                    <Select
                      name={`category`}
                      label="Categorias"
                      options={categorys.map((item) => {
                        return {
                          label: item.unnest,
                          value: item.unnest,
                        };
                      })}
                      onChange={(e, newValue) => {
                        setCategory(newValue.label);
                      }}
                      required
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Select
                    name={`category`}
                    label="Escolha entre Cartão ou Banco"
                    options={[
                      { label: "Cartão", value: "cartao" },
                      { label: "Banco", value: "banco" },
                    ]}
                    onChange={(e, newValue) => {
                      setOpcaoFinanceiro(newValue.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} mt={7}>
                {(cards.length || banks.length) && (
                  <Select
                    name={`category`}
                    label={`Escolha uma opcao do ${opcaoFinanceiro}`}
                    options={
                      opcaoFinanceiro === "cartao"
                        ? cards.map((item) => {
                            return { value: item.id, label: item.name };
                          })
                        : banks.map((item) => {
                            return { value: item.id, label: item.name };
                          })
                    }
                    onChange={(e, newValue) => {
                      setOpcaoId(newValue.value);
                    }}
                  />
                )}
              </Grid>
              <Grid container mt={3} justifyContent="flex-end">
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

export default ModalAddPurchases;
