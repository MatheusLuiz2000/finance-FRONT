import { toast } from "react-toastify";
import { INotifyType } from "../../types";

const NotifySuccess = ({ msg, position = "bottom-left" }: INotifyType) => {
  return toast.success(msg, {
    position,
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const NotifyError = ({ msg, position = "bottom-left" }: INotifyType) => {
  return toast.error(msg, {
    position,
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export {
  NotifySuccess,
  NotifyError
};
