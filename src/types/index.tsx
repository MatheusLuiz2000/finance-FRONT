import { ToastPosition } from "react-toastify";

export type ILoginUser = {
  email: string;
  password: string;
};

export type INotifyType = {
  msg: string;
  position?: ToastPosition;
}