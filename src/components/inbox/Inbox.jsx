import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchMessages, useDeleteEmail } from "../../customhooks/inbox.js";

const Inbox = () => {
  const currentuseremail = useSelector((state) => state.Auth.email);
  const { messages, loading, refetchMessages } =
    useFetchMessages(currentuseremail);
  const deleteEmail = useDeleteEmail(currentuseremail);

  const handleDeleteEmail = async (id) => {
    await deleteEmail(id);
    refetchMessages();
  };

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
                <button
                  onClick={() => handleDeleteEmail(message.id)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
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
