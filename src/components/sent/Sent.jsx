import React from "react";
import { useSelector } from "react-redux";
import { useFetchSentMessages } from "../../customhooks/sent";
import axios from "axios";
const Sent = () => {
  const currentUserEmail = useSelector((state) => state.Auth.email);
  const { messages, loading, refetchMessages } =
    useFetchSentMessages(currentUserEmail);

  const deletetheSentMessages = async (id) => {
    console.log(id);
    try {
      let emailWithoutDot = currentUserEmail.replace(".", "");

      let response = await axios.delete(
        `https://mail-box-3eef5-default-rtdb.firebaseio.com/${emailWithoutDot}sent/Save/${id}.json`
      );
      console.log(response);
      refetchMessages();
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Sent ({messages.length})
        </h1>
        <div className="email-box w-full">
          {loading ? (
            <p>Loading...</p>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id}>
                <div className="email-item border-b border-gray-300 py-4 px-6 cursor-pointer hover:bg-gray-100 transition duration-300">
                  <div className="email-item-content">
                    <h2 className="font-bold mb-1">{message.subject}</h2>
                    <p className="text-gray-600 mb-1">
                      <strong>To:</strong> {message.recipient}
                    </p>
                    <p className="text-gray-800">{message.content}</p>
                  </div>
                  <button
                    onClick={() => deletetheSentMessages(message.id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              You haven't sent any messages.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sent;
