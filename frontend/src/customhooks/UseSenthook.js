import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";
import { useSelector } from "react-redux";

const UseSenthook = () => {
  const [loading, setloading] = useState(false);
  const idtoken = useSelector((state) => state.Auth.idtoken);
  const senttomessagetouser = async (obj) => {
    setloading(true);
    try {
      let response = await axios.post(`${baseurl}/Email/sentemail`, obj, {
        headers: {
          idtoken: idtoken,
        },
      });
      return response;
    } catch (error) {
      return error;
    } finally {
      setloading(false);
    }
  };

  return [loading, senttomessagetouser];
};

export default UseSenthook;
