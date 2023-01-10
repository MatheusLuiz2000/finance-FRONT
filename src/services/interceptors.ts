import axios from "axios";
import { NotifyError } from "../components/Notify";

export const AuthorizationInterceptor = () => {
  axios.interceptors.request.use(
    async (config) => {
      const user = sessionStorage.getItem("user");

      if (user) {
        const userFormat = JSON.parse(user);

        config.headers.Authorization = `Bearer ${userFormat.token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 400) {
        return NotifyError(error.response.data);
      }

      if (error.response.status === 401) {
        return (window.location.href = "/login");
      }

      return Promise.reject(error);
    }
  );
};
