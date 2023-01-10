import axios, { AxiosError } from "axios";
import { setCards, setCategorys } from "../store";

export async function getCards() {
  try {
    const { status, data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/card`,
    });

    return { status, data }
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}

export async function updateCard() {
  try {
    const { status, data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/card`,
    });

    if (status === 200) {
      setCards(data);
    }
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}

export async function createCard(payload) {
  try {
    const { status, data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/card`,
      data: payload,
    });

    return { status, data };
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}
