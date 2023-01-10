import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "../../components/Button";
import Content from "../../components/Content";
import Input from "../../components/Input";
import { createCategory, getCategorys } from "../../services/category";

const Category: React.FC<any> = ({ data }) => {
  const [listCategory, setListCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const search = async () => {
    const get = await getCategorys();

    if (get.status === 200) {
      setListCategory(
        get.data.map((item) => {
          return {
            id: uuid(),
            col1: item.unnest,
          };
        })
      );
    }
  };

  const createNew = async () => {
    const create = await createCategory(newCategory);

    if (create.status === 200) {
      return search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  const columns = [{ field: "col1", headerName: "Nome", width: 600 }];

  return (
    <Content title="Categorias">
      <Grid container>
        <Grid container justifyContent="flex-end" mb={6}>
          <Input
            name="newCategory"
            onChange={(e) => setNewCategory(e.target.value)}
            type="text"
          />
          <Button type="button" onClick={createNew}>Adicionar nova Categoria</Button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 550, width: "100%", marginBottom: "30px" }}>
            <DataGrid rows={listCategory} columns={columns} />
          </div>
        </Grid>
      </Grid>
    </Content>
  );
};

export default Category;
