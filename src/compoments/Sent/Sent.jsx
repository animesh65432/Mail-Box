import React from "react";
import { useSelector } from "react-redux";
import { useFetchSentMessages } from "../../Customhook/sent";
const Sent = () => {
  const currentUserEmail = useSelector((state) => state.Auth.email);
  const { messages, loading } = useFetchSentMessages(currentUserEmail);

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
                      <strong>From:</strong> {message.sender}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>To:</strong> {message.recipient}
                    </p>
                    <p className="text-gray-800">{message.content}</p>
                  </div>
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
