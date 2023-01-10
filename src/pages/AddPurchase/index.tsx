import React, { useEffect, useState } from "react";
import Content from "../../components/Content";
import { Grid, Typography } from "@mui/material";
import { UilPlusCircle } from "@iconscout/react-unicons";
import { UilCloudUpload } from "@iconscout/react-unicons";
import Papa from "papaparse";
import ModalPurchase from "../../components/ModalPurchases";
import uuid from "react-uuid";
import { updateCategorys } from "../../services/category";
import { updateBank } from "../../services/bank";
import { updateCard } from "../../services/card";
import ModalAddPurchases from "../../components/ModalAddPurchases";

const AddPurchase: React.FC<any> = ({ data }) => {
  const boxStyles = {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    backgroundColor: "#ffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
    "& h4": {
      fontSize: "27px",
      color: "#A1A2AF",
      fontFamily: "Questrial",
      fontWeight: "400",
      marginTop: "15px",
    },
    "& svg": {
      width: "130px",
      height: "130px",
      fill: "#A1A2AF",
    },
  };

  const [modalPurchase, setModalPurchase] = useState(false);
  const [modalAddPurchase, setAddModalPurchase] = useState(false);

  const [contentPurchase, setContentPurchase] = useState("");
  const [headerPurchase, setHeaderPurchase] = useState([]);
  const [optionsBanco, setOptionsBanco] = useState([]);
  const [optionsCartao, setOptionsCartao] = useState([]);

  const handleFileInput = (e) => {
    const readCSV = changeHandler(e);
  };

  useEffect(() => {
    updateCategorys();
    updateBank();
    updateCard();
  }, []);

  const changeHandler = (event: any) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (results.data.length) {
          setHeaderPurchase(Object.getOwnPropertyNames(results.data[0]));
          setContentPurchase(
            results.data.map((item) => {
              return {
                ...item,
                id: uuid(),
              };
            })
          );
          setModalPurchase(true);
        }
      },
    });
  };

  return (
    <Content title="Adicionar Gastos">
      <ModalPurchase
        open={modalPurchase}
        setOpen={setModalPurchase}
        content={contentPurchase}
        header={headerPurchase}
        optionsCartao={optionsCartao}
        optionsBanco={optionsBanco}
        setContentPurchase={setContentPurchase}
      />
      <ModalAddPurchases
        open={modalAddPurchase}
        setOpen={setAddModalPurchase}
      />
      <Grid container justifyContent="center">
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "18px",
            color: "#A1A2AF",
            fontFamily: "Questrial",
            fontWeight: 400,
          }}
        >
          Escolha uma das opções que melhor se atende.
        </Typography>
        <Grid container justifyContent="center" mt={3}>
          <b style={{textDecoration: 'underline', color: 'red', fontSize: '20px'}}>Adicionar gastos apenas da semana!</b>
        </Grid>
        <Grid container justifyContent="center" mt={4}>
          <Grid
            item
            xs={5}
            mr={7}
            sx={boxStyles}
            onClick={(e) => setAddModalPurchase(true)}
          >
            <UilPlusCircle />
            <h4>Adicionar Manualmente</h4>
          </Grid>
          <Grid item xs={5} sx={boxStyles}>
            <UilCloudUpload />
            <input type="file" onChange={handleFileInput} />
            <h4>Adicionar CSV</h4>
          </Grid>
        </Grid>
      </Grid>
    </Content>
  );
};

export default AddPurchase;
