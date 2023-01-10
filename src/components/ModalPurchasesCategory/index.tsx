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
import Table from "../Table";
import formatCurrency from "../../util/formatCurrency";

const ModalPurchasesCategory: React.FC<any> = ({
  open,
  setOpen,
  category,
  spents,
}) => {
  const handle = () => {
    setOpen((prev) => !prev);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1300,
    height: 850,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
    p: 2,
    "& h2": {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: '25px'
    },
  };

  return (
    <Modal
      open={open}
      onClose={handle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Gastos na categoria {category}</h2>
        <Table
          header={[
            {
              id: "description",
              label: "Descricao",
            },
            {
              id: "category",
              label: "Categoria",
            },
            {
              id: "dateSpent",
              label: "Data que foi gasto",
            },
            {
              id: "card_bank",
              label: "Banco ou Cartão",
            },
            {
              id: "amount",
              label: "Valor",
            },
          ]}
          rows={
            spents.length &&
            spents.map((item) => {
              return {
                description: item.description,
                category: item.category,
                dateSpent: new Date(item.dateSpent).toLocaleDateString("pt-BR"),
                card_bank: item.bankId ? "Banco" : "Cartão",
                amount: formatCurrency(item.amount),
              };
            })
          }
        />
      </Box>
    </Modal>
  );
};

export default ModalPurchasesCategory;
