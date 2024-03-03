import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { databse } from "../../assets/Needed";

const Inbox = () => {
  const currentuseremail = useSelector((state) => state.Auth.email);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    try {
      const email = currentuseremail.replace(".", "");
      const url = `${databse}${email}/Save.json`;
      const response = await axios.get(url);
      console.log(response);
      setMessages(response.data);
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

  return (
    <div className="flex justify-center items-center h-full">
      {loading ? (
        <p>Loading...</p> // Display loading indicator while fetching data
      ) : (
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Inbox</h1>
          <div className="email-box w-full">
            {messages && Object.keys(messages).length > 0 ? (
              Object.keys(messages).map((messageId) => {
                const message = messages[messageId];
                return (
                  <div
                    key={messageId}
                    className="email-item border-b border-gray-300 py-4 px-6 cursor-pointer hover:bg-gray-100 transition duration-300"
                  >
                    <div className="email-item-content">
                      <h2 className="font-bold mb-1">{message.subject}</h2>
                      <p className="text-gray-600 mb-1">
                        From: {message.sender}
                      </p>
                      <p className="text-gray-600 mb-1">
                        To: {message.recipient}
                      </p>
                      <p className="text-gray-800">{message.content}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600 text-center">
                You don't have any messages.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
