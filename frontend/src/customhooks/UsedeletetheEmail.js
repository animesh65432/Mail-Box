import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";

const UsedeletetheEmail = () => {
  const [loading, setloading] = useState(false);
  const deletetheemail = async (id) => {
    setloading(true);
    try {
      let response = await axios.delete(`${baseurl}/Email/deleteEmail/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return [loading, deletetheemail];
};

export default UsedeletetheEmail;
