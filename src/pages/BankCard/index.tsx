import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Content from "../../components/Content";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Card from "../../components/Card";
import { Box } from "@mui/system";
import ModalBankCard from "../../components/ModalBankCard";
import { getBanks } from "../../services/bank";
import { getCards } from "../../services/card";

const BankCard: React.FC<any> = ({ data }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [banks, setBanks] = useState([]);
  const [cards, setCards] = useState([]);

  const search = async () => {
    const getBank = await getBanks();
    const getCard = await getCards();

    if(getBank.status === 200) {
      setBanks(getBank.data);
    }

    if(getCard.status === 200) {
      setCards(getCard.data);
    }
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <Content title="Contas/Cartoes">
      <ModalBankCard open={openModal} setOpen={setOpenModal} />
      <Grid container justifyContent="flex-end">
        <Grid item xs={2}>
          <Button type="button" onClick={(e) => setOpenModal(true)}>
            Adicionar Cartão/Conta
          </Button>
        </Grid>
        <Tabs
          className="react-tabs react-tabs-two"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList>
            <Tab>Meus cartoes</Tab>
            <Tab>Meus bancos</Tab>
          </TabList>
          <TabPanel>
            <Grid container>
              {banks.map((item) => {
                return (
                  <Grid item xs={6}>
                    <Card numberFinal={item.finalNumber} />
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid container>
              {cards.map((item) => {
                return (
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#ffff",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        borderRadius: "10px",
                        height: "200px",
                        margin: "20px",
                        "& h2": { color: "#1e1e2d" },
                      }}
                    >
                      <h2>{item.name}</h2>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>
        </Tabs>
      </Grid>
    </Content>
  );
};

export default BankCard;
