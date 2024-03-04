import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { database } from "../assets/Needed";

export function useFetchMessages() {
  const currentuseremail = useSelector((state) => state.Auth.email);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    const email = currentuseremail.split(".");
    const emailwitoutcom = email[0] + email[1];
    const url = `${database}${emailwitoutcom}/Save.json`;
    try {
      const email = currentuseremail.split(".");
      const emailwitoutcom = email[0] + email[1];
      const url = `${database}${emailwitoutcom}/Save.json`;
      console.log(url);
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
  }

  useEffect(() => {
    fetchMessages();
  }, [currentuseremail]);

  return { messages, loading, fetchMessages };
}
export function useDeleteMessage() {
  const currentuseremail = useSelector((state) => state.Auth.email);

  async function deleteMessage(id) {
    try {
      let emailarray = currentuseremail.split(".");
      let usersperation = emailarray[0] + emailarray[1];
      let url = `${database}${usersperation}/Save/${id}.json`;
      await axios.delete(url);
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  }

  return deleteMessage;
}

export function useFetchMessageInboxfullById(messageId) {
  const currentuseremail = useSelector((state) => state.Auth.email);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let withoutcom = currentuseremail.split(".");
        const usersperation = withoutcom[0] + withoutcom[1];
        const url = `${database}${usersperation}/Save/${messageId}.json`;
        const response = await axios.get(url);
        setMessage(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentuseremail, messageId]);

  return { message, loading };
}
