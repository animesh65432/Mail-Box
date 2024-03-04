import { database } from "../assets/Needed";
import { useEffect, useState } from "react";
import axios from "axios";

const fullemailshow = (currentuseremail, id) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersperation = currentuseremail.replace(".", ",");
        const url = `${database}${usersperation}/Save/${id}.json`;
        const response = await axios.get(url);
        setMessage(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentuseremail, id]);

  return { loading, message };
};

export default fullemailshow;
