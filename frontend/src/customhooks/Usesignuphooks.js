import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";

const Usesignuphooks = () => {
  const [loading, setLoading] = useState(false);

  const createUser = async (obj) => {
    console.log(obj);
    setLoading(true);
    try {
      let response = await axios.post(`${baseurl}/user/singup`, obj);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [loading, createUser];
};

export default Usesignuphooks;
