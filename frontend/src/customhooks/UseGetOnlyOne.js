import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";
import { useSelector } from "react-redux";

const UseGetOnlyOne = () => {
  const [loading, setloading] = useState(false);
  const idtoken = useSelector((state) => state.Auth.idtoken);
  const fecthOnlyOneThing = async (id) => {
    setloading(true);
    try {
      let response = await axios.get(`${baseurl}/Email/GetOne/${id}`, {
        headers: {
          idtoken: idtoken,
        },
      });
      return response?.data?.data;
    } catch (error) {
      return null;
    } finally {
      setloading(false);
    }
  };

  return [loading, fecthOnlyOneThing];
};

export default UseGetOnlyOne;
