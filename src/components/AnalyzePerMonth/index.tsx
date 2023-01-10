import { Grid, Typography } from "@mui/material";
import Button from "../../components/Button";
import Input from "../../components/Input";
import _ from "lodash";
import formatCurrency from "../../util/formatCurrency";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CategoryIcon from "../../util/getCategoryIcon";
import { useState } from "react";
import { findTransactions } from "../../services/transaction";
import ModalPurchasesCategory from "../ModalPurchasesCategory";
import sumValues from "../../util/sumValues";

export default function AnalyzePerMonth() {
  const [listPurchases, setListPurchases] = useState([]);
  const [listCategorys, setListCategorys] = useState([]);
  const [listChartBars1, setListChartBars1] = useState([]);
  const [mes, setMes] = useState("1");
  const [ano, setAno] = useState("2023");
  const [modalCategory, setModalCategory] = useState(false);
  const [categoryActive, setCategoryActive] = useState("");
  const [spentsActive, setSpentsActive] = useState(false);

  const findPurchases = async () => {
    const find = await findTransactions(mes, ano);

    if (find.status === 200) {
      setListPurchases(find.data);
      const groupBy = _.groupBy(find.data, (item) => item.category);

      const listEntries = Object.entries(groupBy);

      for (let element of listEntries) {
        const index = element[0];
        groupBy[index].sum = sumValues(element[1]);
      }

      setListCategorys(Object.entries(groupBy));
      const listCharts = Object.entries(groupBy).map((item) => {
        return {
          name: item[0],
          uv: 6000,
          pv: item[1].sum,
          amt: 2400,
        };
      });

      setListChartBars1(listCharts);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${formatCurrency(
            payload[0].value
          )}`}</p>
        </div>
      );
    }

    return null;
  };

  const openCategoryModal = (category, spents) => {
    setCategoryActive(category);
    setSpentsActive(spents);
    setModalCategory(true);
  };

  return (
    <>
      <Grid
        container
        columnSpacing={2}
        justifyContent="flex-end"
        alignItems="self-end"
      >
        <ModalPurchasesCategory
          open={modalCategory}
          setOpen={setModalCategory}
          category={categoryActive}
          spents={spentsActive}
        />
        <Grid item xs={1}>
          <Input
            name="mes"
            label="Mês"
            maxLength="2"
            onChange={(e) => setMes(e.target.value)}
          />
        </Grid>
        <Grid item xs={1} mr={3}>
          <Input
            name="ano"
            label="Ano"
            maxLength="4"
            onChange={(e) => setAno(e.target.value)}
          />
        </Grid>
        <Button
          secondarySX={{ alignItems: "center" }}
          type="button"
          onClick={findPurchases}
        >
          Buscar
        </Button>
      </Grid>
      <Grid container mt={6} justifyContent="center">
        {listCategorys.length ? (
          <>
            <Grid item xs={9}>
              <h2>Análise dos Gastos3</h2>
              <Grid item xs={12} mt={3} sx={{ height: "550px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={listChartBars1}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={20}
                  >
                    <XAxis
                      dataKey="name"
                      scale="point"
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar
                      dataKey="pv"
                      fill="#8884d8"
                      background={{ fill: "#eee" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                "& svg": { marginRight: "8px" },
                "& b": {
                  marginLeft: "5px",
                  fontFamily: "Questrial",
                  color: "#e74c3c",
                },
                "& span": { fontWeight: 600, color: "#1e1e2d" },
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: "17px", fontWeight: "bold" }}
                mb={3}
              >
                Composicao dos Gastos por Categoria
              </Typography>
              <ul>
                {listCategorys
                  .sort((a, b) => {
                    return b[1].sum - a[1].sum;
                  })
                  .map((item) => {
                    console.log("a", item);
                    return (
                      <li
                        style={{
                          margin: "23px 0px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => openCategoryModal(item[0], item[1])}
                      >
                        <span>
                          <CategoryIcon category={item[0]} />
                        </span>
                        <span>{item[0]}: </span>
                        <b style={{ color: "red", fontSize: "10x" }}>
                          {formatCurrency(item[1].sum)}
                        </b>
                      </li>
                    );
                  })}
              </ul>
            </Grid>
          </>
        ) : (
          <h2>Selecione um periodo especifico</h2>
        )}
      </Grid>
    </>
  );
}
