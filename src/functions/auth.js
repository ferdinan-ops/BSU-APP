import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import toast from "react-hot-toast";
import { login } from "../config/redux/features";

export const createAuth = (fields, dispatch, resetField) => {
  axios.post("/api/users", fields, { headers: { "Content-Type": "Application/json" } })
    .then((result) => {
      if (result.status === 402) {
        resetField();
        return toast.error(result.data.data.msg);
      }
      dispatch(login(result.data));
      Cookies.set("token", result.data.token);
      console.log(result.data);
      Router.push("/");
      resetField();
    }).catch((error) => {
      toast.error(error.message);
      resetField();
    });
}