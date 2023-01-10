import axios, { AxiosError } from "axios";
import { ILoginUser } from "../types";

export async function makeLogin(payload: ILoginUser) {
  try {
    const { status, data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/login`,
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
