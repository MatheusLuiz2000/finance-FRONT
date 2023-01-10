import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, Typography } from "@mui/material";
import Input from "../Input";
import CurrencyInput from "../CurrencyInput";
import { getBanks, getCards, getCategorys, getUser } from "../../store";
import Select from "../Select";
import Button from "../Button";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { DataGrid } from "@mui/x-data-grid";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { UilArrowRight } from "@iconscout/react-unicons";
import { createTransactions } from "../../services/transaction";
import { createBank } from "../../services/bank";
import { createCard } from "../../services/card";

const ModalBankCard: React.FC<any> = ({ open, setOpen }) => {
  const handle = () => {
    setOpen((prev) => !prev);
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [nameCartao, setNameCartao] = useState("");
  const [finalNumber, setFinalNumber] = useState("");
  const [limiteCartao, setLimiteCartao] = useState("");
  const [cartaoDataVencimento, setCartaoDataVencimento] = useState("");
  const [nameBanco, setNameBanco] = useState("");

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

  const handleSubmitCartao = async (e) => {
    e.preventDefault();

    await createBank({
      name: nameBanco,
    });
  };

  const handleSubmitBanco = async (e) => {
    e.preventDefault();

    await createCard({
      name: nameCartao,
      limitAmount: limiteCartao,
      finalNumber: finalNumber,
      dueDate: cartaoDataVencimento,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Adicionar um novo cartão/banco</h2>
        <Tabs
          className="react-tabs react-tabs-two"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList>
            <Tab>Criar um cartão</Tab>
            <Tab>Criar um Banco</Tab>
          </TabList>
          <TabPanel>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Poppins",
                textAlign: "center",
              }}
            >
              Criar novo cartão!
            </Typography>
            <form onSubmit={handleSubmitCartao}>
              <Grid container mb={2} mt={2} justifyContent="center">
                <Grid item xs={5} mr={4}>
                  <Input
                    type="text"
                    label="Nome do cartão"
                    name="name_cartao"
                    onChange={(e) => setNameCartao(e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Input
                    type="text"
                    label="Final do cartão"
                    name="finalNumber"
                    onChange={(e) => setFinalNumber(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container mb={4} justifyContent="center">
                <Grid item xs={5} mr={3}>
                  <Input
                    type="text"
                    label="Limite no cartão"
                    name="limitAmount"
                    onChange={(e) => setLimiteCartao(e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Input
                    type="text"
                    label="Data de Vencimento"
                    name="dueDate"
                    onChange={(e) => setCartaoDataVencimento(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" mt={3}>
                <Button type="submit">Criar novo</Button>
              </Grid>
            </form>
          </TabPanel>
          <TabPanel>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Poppins",
                textAlign: "center",
              }}
            >
              Criar novo banco
            </Typography>
            <form onSubmit={handleSubmitBanco}>
              <Grid container mb={2} mt={2} spacing={6} justifyContent="center">
                <Grid item xs={6}>
                  <Input
                    type="text"
                    label="Nome do banco"
                    name="name2"
                    onChange={(e) => setNameBanco(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" mt={3}>
                <Button type="submit">Criar novo</Button>
              </Grid>
            </form>
          </TabPanel>
        </Tabs>
      </Box>
    </Modal>
  );
};

export default ModalBankCard;
