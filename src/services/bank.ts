import axios, { AxiosError } from "axios";
import { setBanks, setCategorys } from "../store";

export async function getBanks() {
  try {
    const { status, data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/bank`,
    });

    return { status, data };
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}

export async function updateBank() {
  try {
    const { status, data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/bank`,
    });

    if (status === 200) {
      setBanks(data);
    }
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}

export async function createBank(payload) {
  try {
    const { status, data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/bank`,
      data: payload
    });

    return { status, data }
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}