import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";
import { useSelector } from "react-redux";

const UseGetalltheinbox = () => {
  const [loading, setloading] = useState([]);
  const idtoken = useSelector((state) => state.Auth.idtoken);
  const fecthTheinboxmessages = async () => {
    setloading(true);
    try {
      let response = await axios.get(`${baseurl}/Email/getheinboxemail`, {
        headers: {
          idtoken: idtoken,
        },
      });
      return response?.data?.data;
    } catch (error) {
      return error?.data;
    } finally {
      setloading(false);
    }
  };

  return [loading, fecthTheinboxmessages];
};

export default UseGetalltheinbox;
