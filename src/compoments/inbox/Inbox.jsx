import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { database } from "../../assets/Needed";
import { Link } from "react-router-dom";

const Inbox = () => {
  const currentuseremail = useSelector((state) => state.Auth.email);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    try {
      const email = currentuseremail.replace(".", "");
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
  }

  async function deltetheemail(id) {
    try {
      let emailarray = currentuseremail.split(".");
      let usersperation = emailarray[0] + emailarray[1];
      let url = `${database}${usersperation}/Save/${id}.json`;
      console.log(url);
      let reponse = await axios.delete(url);
      console.log(reponse);
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [currentuseremail]);

  console.log(messages);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Inbox ({messages.length})
        </h1>
        <div className="email-box w-full">
          {loading ? (
            <p>Loading...</p>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id}>
                <Link to={`/messages/${message.id}`} key={message.id}>
                  <div className="email-item border-b border-gray-300 py-4 px-6 cursor-pointer hover:bg-gray-100 transition duration-300">
                    <div className="email-item-content">
                      <h2 className="font-bold mb-1">{message.subject}</h2>
                      <p className="text-gray-600 mb-1">
                        <strong>From:</strong> {message.recipient}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <strong>To:</strong> {currentuseremail}
                      </p>
                      <p className="text-gray-800">{message.content}</p>
                    </div>
                  </div>
                </Link>
                <button onClick={() => deltetheemail(message.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              You don't have any messages.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
