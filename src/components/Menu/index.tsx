import React from "react";
import { Grid } from "@mui/material";
import { UilTachometerFastAlt } from "@iconscout/react-unicons";
import { UilChartBar } from "@iconscout/react-unicons";
import { UilWallet } from "@iconscout/react-unicons";
import { UilTransaction } from "@iconscout/react-unicons";
import { UilAlignAlt } from "@iconscout/react-unicons";
import { UilSetting } from "@iconscout/react-unicons";
import { UilSignout } from "@iconscout/react-unicons";
import Erick from "../../assets/images/Erick.png";
import { Link } from "react-router-dom";
import { UilMoneyInsert } from '@iconscout/react-unicons'

const Menu: React.FC<any> = ({ children, user }) => {
  return (
    <>
      <h2>Financial Wallet</h2>
      <img className="avatar" src={Erick} alt="Avatar" />
      <h4>{user.name || "Matheus"}</h4>
      <p className="description">Usuário Premium</p>
      <ul>
        <li>
          <Link to="/dashboard">
            <UilTachometerFastAlt />
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link to="/analise">
            <UilChartBar />
            <p>Análise de Gastos</p>
          </Link>
        </li>
        <li>
          <Link to="/adicionar-gastos">
            <UilWallet />
            <p>Adicionar Gastos</p>
          </Link>
        </li>
        <li>
          <Link to="/banco-cartao">
            <UilTransaction />
            <p>Contas/Cartoes</p>
          </Link>
        </li>
        <li>
          <Link to="/category">
            <UilAlignAlt />
            <p>Categorias</p>
          </Link>
        </li>
        <li>
          <Link to="/earnings">
            <UilMoneyInsert />
            <p>Receitas</p>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <UilSetting />
            <p>Configuracoes</p>
          </Link>
        </li>
      </ul>
      <div className="logout">
        <UilSignout />
        <p>Sair</p>
      </div>
    </>
  );
};

export default Menu;
