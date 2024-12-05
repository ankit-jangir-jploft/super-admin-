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
    if (res.status == 200) {
      return res;
    }
  } catch (error) {
    toast.dismiss();
    console.log(error);
  }
};

export const POST = async (Url, data) => {
  const token = Cookies.get("dugnadstisadmin");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(Url, data, config);
    if (res.status == 200) {
      return res;
    }
  } catch (error) {
    toast.dismiss();
    return toast.error(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};
