import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";

const UseSenthook = () => {
  const [loading, setloading] = useState(false);
  const senttomessagetouser = async (obj) => {
    setloading(true);
    try {
      let response = await axios.post(`${baseurl}/Email/senttomessage`, obj);
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
