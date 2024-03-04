import { useEffect, useState } from "react";
import axios from "axios";
import { database } from "../assets/Needed";

export const useFetchMessages = (currentuseremail) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const email = currentuseremail.replace(".", ",");
      const url = `${database}${email}/Save.json`;
      const response = await axios.get(url);
      const data = response.data;
      const messagesArray = Object.entries(data).map(([id, message]) => ({
        id,
        ...message,
      }));
      setMessages(messagesArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
      setLoading(false);
    }
  };

  const refetchMessages = () => {
    setLoading(true);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [currentuseremail]);

  return { messages, loading, refetchMessages };
};
export const useDeleteEmail = (currentuseremail) => {
  const deleteEmail = async (id) => {
    try {
      let usersperation = currentuseremail.replace(".", ",");
      let url = `${database}${usersperation}/Save/${id}.json`;
      await axios.delete(url);
    } catch (err) {
      console.error("Error deleting email:", err);
    }
  };

  return deleteEmail;
};
