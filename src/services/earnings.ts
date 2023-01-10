import axios, { AxiosError } from "axios";

export async function createEarning(payload) {
  try {
    const { status, data } = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/earnings`,
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

export async function getEarnings(year, month) {
  try {
    const { status, data } = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/earnings`,
      params: {
        year,
        month
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

export async function deleteEarnings(id) {
  try {
    const { status, data } = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/earnings/${id}`,
    });

    return { status, data };
  } catch (err: any | AxiosError) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 404, data: err.request };

    return { status: 500, data: err };
  }
}
