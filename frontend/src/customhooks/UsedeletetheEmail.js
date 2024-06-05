import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";
import { useSelector } from "react-redux";

const UsedeletetheEmail = () => {
  const [emailloading, setloading] = useState(false);
  const idtoken = useSelector((state) => state.Auth.idtoken);
  const deletetheemail = async (id) => {
    setloading(true);
    try {
      let response = await axios.delete(`${baseurl}/Email/deleteEmail/${id}`, {
        headers: {
          idtoken: idtoken,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return [emailloading, deletetheemail];
};

export default UsedeletetheEmail;
