import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import '../src/assets/css/general.css';
import '../src/assets/css/tabs.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/Login";
import Routes from "./routes";
import Dashboard from "./pages/Dashboard";
import AddPurchase from "./pages/AddPurchase";
import { AuthorizationInterceptor } from "./services/interceptors";
import Purchases from "./pages/Purchases";
import BankCard from "./pages/BankCard";
import Category from "./pages/Category";
import Earnings from "./pages/Earnings";

AuthorizationInterceptor();


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<LoginPage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="earnings" element={<Earnings />} />
      <Route path="adicionar-gastos" element={<AddPurchase />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="analise" element={<Purchases />} />
      <Route path="banco-cartao" element={<BankCard />} />
      <Route path="category" element={<Category />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
