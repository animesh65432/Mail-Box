import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";
import { useDispatch } from "react-redux";
import { addthetoken } from "../Reduex/Authslice";

const UseLoginHooks = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginUser = async (obj) => {
    setLoading(true);
    try {
      let response = await axios.post(`${baseurl}/user/login`, obj);
      console.log(response?.data?.idtoken);
      dispatch(addthetoken(response?.data?.idtoken));
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [loading, loginUser];
};

export default UseLoginHooks;
