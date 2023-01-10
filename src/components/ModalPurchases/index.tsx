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

const ModalPurchase: React.FC<any> = ({
  open,
  setOpen,
  content,
  setContentPurchase,
}) => {
  const handle = () => {
    setOpen((prev) => !prev);
  };

  const categorys = getCategorys();
  const banks = getBanks();
  const cards = getCards();
  const user = getUser();

  const [list, setList] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [dateSpent, setDateSpent] = useState("");
  const [description, setDescription] = useState("");
  const [activeId, setActiveId] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [opcaoFinanceiro, setOpcaoFinanceiro] = useState("cartao");
  const [optionKey, setOptionKey] = useState(0);
  const [rowsTable, setRowsTable] = useState([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) return;

    const values = {
      description: description,
      amount: amount,
      dateSpent: dateSpent,
      userId: user.id,
      category: category,
      ...(opcaoFinanceiro === "cartao" && { cardId: opcaoId }),
      ...(opcaoFinanceiro === "banco" && { bankId: opcaoId }),
    };

    setList((prev) => [...prev, values]);
    setContentPurchase((prev) => prev.filter((item) => item.id !== activeId));
  };

  const onSave = async () => {
    await createTransactions(list);
  };

  const handleDelete = () => {
    setContentPurchase((prev) => prev.filter((item) => item.id !== activeId));
  };

  const handleEdit = (e) => {
    setAmount(e.amount);
    setDateSpent(e.dateSpent);
    setDescription(e.description);
    setCategory(e.category);
    setActiveId(e.id);
  };

  useEffect(() => {
    if (list.length) {
      const formatList = list.map((item, key) => {
        return {
          id: key,
          col1: item.dateSpent,
          col2: item.amount,
          col3: item.description,
          col4: item.category,
          col5: item.cardId ? "Cartão" : "Banco",
          col6: item,
        };
      });

      setRowsTable(formatList);
    }
  }, [list]);

  const columns = [
    { field: "col1", headerName: "Data", width: 120 },
    { field: "col2", headerName: "Valor", width: 120 },
    { field: "col3", headerName: "Descricao", width: 450 },
    { field: "col4", headerName: "Categoria", width: 150 },
    { field: "col5", headerName: "Opcao", width: 150 },
    {
      field: "col6",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Button type="button" onClick={(e) => handleEdit(params.row.col6)}>
            Editar
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    if (content.length) {
      updateContent(true);
    }
  }, [content]);

  const updateContent = useCallback(
    (novo = false, type = "increase") => {
      const key = novo
        ? 0
        : type === "increase"
        ? optionKey + 1
        : optionKey - 1;

      setAmount(content[key].Valor);
      setDateSpent(content[key].Data);
      setDescription(content[key].Descrição);
      setOptionKey(key);
      setActiveId(content[key].id);
    },
    [optionKey, content]
  );

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
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Análise dos valores</Tab>
                <Tab>Revisão dos valores</Tab>
              </TabList>
              <TabPanel>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        <Grid
                          item
                          xs={2}
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-start"
                          onClick={() => updateContent(false, "decrease")}
                          sx={{ cursor: "pointer" }}
                        >
                          <UilArrowLeft />
                          <p>Voltar</p>
                        </Grid>
                        <Grid item xs={2}>
                          <p>
                            {optionKey}/{content.length}
                          </p>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-end"
                          onClick={() => updateContent(false)}
                          sx={{ cursor: "pointer" }}
                        >
                          <p>Próximo</p>
                          <UilArrowRight />
                        </Grid>
                      </Grid>
                      <Typography
                        variant="body1"
                        mt={2}
                        sx={{
                          fontSize: "25px",
                          fontWeight: "700",
                          textAlign: "center",
                          fontFamily: "Poppins",
                        }}
                      >
                        Revisar gastos
                      </Typography>
                      <Grid container mt={4} justifyContent="center">
                        <Grid item xs={12}>
                          <CurrencyInput
                            name={`amount`}
                            label="Digite o valor"
                            value={amount}
                            onValueChange={(value, name) => setAmount(value)}
                          />
                        </Grid>
                      </Grid>
                      <Grid container mt={4} justifyContent="center">
                        <Grid item xs={12}>
                          <Input
                            name={`dateSpent`}
                            label="Data do gasto"
                            value={dateSpent}
                            onChange={(e) => setDateSpent(e.target.value)}
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
                      {category.length && (
                        <Grid container mt={4} justifyContent="center">
                          <Grid item xs={12}>
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
                          </Grid>
                        </Grid>
                      )}
                      <Grid item xs={12} mt={4}>
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
                      <Grid item xs={12} mt={4}>
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
                      <Grid container mt={3} justifyContent="space-between">
                        <Grid item xs={1}>
                          <Button error type="button" onClick={handleDelete}>
                            Descartar
                          </Button>
                        </Grid>
                        <Grid item xs={1}>
                          <Button type="submit">Salvar</Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel>
                <div
                  style={{ height: 550, width: "100%", marginBottom: "30px" }}
                >
                  <DataGrid rows={rowsTable} columns={columns} />
                </div>
                <Button type="button" onClick={onSave}>
                  Salvar lista!
                </Button>
              </TabPanel>
            </Tabs>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalPurchase;
