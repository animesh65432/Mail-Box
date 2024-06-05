import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";
import { useSelector } from "react-redux";

const UseGetSentEmail = () => {
  const [loading, setloading] = useState([]);
  const idtoken = useSelector((state) => state.Auth.idtoken);
  const fecthalltheSentEmail = async () => {
    setloading(true);
    try {
      let response = await axios.get(`${baseurl}/Email/getthesentemail`, {
        headers: {
          idtoken: idtoken,
        },
      });
      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return error.data;
    } finally {
      setloading(false);
    }
  };

  return [loading, fecthalltheSentEmail];
};

export default UseGetSentEmail;
