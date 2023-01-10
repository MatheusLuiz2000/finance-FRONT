import axios, { AxiosError } from "axios";
import { setCategorys } from "../store";

export async function getCategorys() {
  try {
    const { status, data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/category`,
    });

    return { status, data }
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}

export async function createCategory(newCategory) {
  try {
    const { status, data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/category`,
      data: {
        newCategory
      }
    });

    return { status, data }
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}

export async function updateCategorys() {
  try {
    const { status, data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/category`,
    });

    if (status === 200) {
      setCategorys(data);
    }
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}
