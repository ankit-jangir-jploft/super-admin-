import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const GET = async (Url, data) => {
  const token = Cookies.get("dugnadstisadmin");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  };
  try {
    const res = await axios.get(Url, config);

    return res;
  } catch (error) {
    toast.dismiss();
    console.log(error);
  }
};

export const POST = async (Url, data) => {
  const token = Cookies.get("dugnadstisadmin");
  const lang = Cookies.get("i18next");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  data.lang = lang;
  try {
    const res = await axios.post(Url, data, config);
    return res;
  } catch (error) {
    toast.dismiss();
    console.log("error", error);

    return toast.error(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};
