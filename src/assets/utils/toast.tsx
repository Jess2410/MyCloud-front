import { toast } from "react-toastify";
/*
 * @param {String} type le type de toast
 * @param {String} message le text a affiché
 */

export const Toast = (type: string = "warning", message: string) => {
  return toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
