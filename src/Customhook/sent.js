import { useEffect, useState } from "react";
import axios from "axios";
import { database } from "../assets/Needed";

export const useFetchSentMessages = (currentUserEmail) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const emailParts = currentUserEmail.split(".");
        const emailWithoutDot = emailParts.join("");
        const url = `${database}${emailWithoutDot}sent/Save.json`;
        const response = await axios.get(url);
        const data = response?.data;
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

    fetchMessages();
  }, [currentUserEmail]);

  return { messages, loading };
};
