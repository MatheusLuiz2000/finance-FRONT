import axios, { AxiosError } from "axios";

export async function createTransactions(payload) {
  try {
    const { status, data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/transactions`,
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

export async function findTransactions(mes, ano) {
  const date = new Date();

  try {
    const { status, data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/transaction`,
      params: {
        mes: mes || date.getMonth(),
        ano: ano || date.getFullYear()
      }
    });

    return { status, data };
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}

export async function createTransaction(payload) {
  try {
    const { status, data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/transaction`,
      data: payload
    });

    return { status, data };
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}
