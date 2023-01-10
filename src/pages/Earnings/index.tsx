import { Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import AnalyzePeriod from "../../components/AnalyzePeriod";
import Button from "../../components/Button";
import Content from "../../components/Content";
import ModalAddEarnings from "../../components/ModalAddEarnings";
import Table from "../../components/Table";
import { deleteEarnings, getEarnings } from "../../services/earnings";
import formatCurrency from "../../util/formatCurrency";
import getMonth from "../../util/getMonth";
import sumValues from '../../util/sumValues'

const Earnings: React.FC<any> = ({ data }) => {
  const [modalEarnings, setModalEarnings] = useState(false);
  const [earnings, setEarnings] = useState([]);
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState(getMonth(new Date().getMonth()));
  const [total, setTotal] = useState(0);

  const getEarning = async () => {
    const get = await getEarnings(year, month);

    if (get.status === 200) {
      setEarnings(get.data.query);

      return setTotal(sumValues(get.data.total));
    }
  };

  const sumTotal = useMemo(() => {
    if (!earnings.length) return "R$ 0,00";

    return formatCurrency(sumValues(earnings));
  }, [earnings]);

  const handleDelete = async (id) => {
    const makeDelete = await deleteEarnings(id);

    if (makeDelete.status === 200) {
      return getEarning();
    }
  };

  useEffect(() => {
    getEarning();
  }, [year, month]);

  return (
    <Content title="Receita">
      <Grid container mb={4} justifyContent="flex-end">
        <Grid item xs={2} justifyContent="flex-end">
          <Button type="button" onClick={() => setModalEarnings(true)}>
            Adicionar nova receita3
          </Button>
        </Grid>
      </Grid>
      <ModalAddEarnings open={modalEarnings} setOpen={setModalEarnings} />
      <Grid container>
        <AnalyzePeriod
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          sumValues={<h2 style={{ fontSize: '26px'}}>Receita do ano de {year}: {formatCurrency(total)}</h2>}
        />
        <Grid container mt={4} justifyContent='flex-end'>
          <h2 style={{fontSize: '30px'}}>Receita do mês: {sumTotal}</h2>
        </Grid>
        <Grid container mt={6}>
          <Grid item xs={12}>
            {earnings.length ? (
              <Table
                headerResponsive={false}
                actionDelete={handleDelete}
                header={[
                  {
                    id: "description",
                    label: "Descricao",
                  },
                  {
                    id: "month",
                    label: "Mês",
                  },
                  {
                    id: "year",
                    label: "ano",
                  },
                  {
                    id: "amount",
                    label: "Valor recebido",
                  },
                ]}
                rows={earnings.map((item) => {
                  return {
                    id: item.id,
                    description: item.description,
                    month: item.month,
                    year: item.year,
                    amount: formatCurrency(item.amount),
                  };
                })}
              />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Content>
  );
};

export default Earnings;
