import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import fullemailshow from "../../customhooks/fullemailshow";

const Inboxfull = () => {
  const { id } = useParams();
  const currentuseremail = useSelector((state) => state.Auth.email);
  const { loading, message } = fullemailshow(currentuseremail, id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {message && (
        <div className="max-w-2xl w-full border border-gray-300 p-8 rounded-lg shadow-xl bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">{message.subject}</h2>
            <div className="flex items-center">
              <p className="text-sm font-bold mr-2">From:</p>
              <span>{message.recipient}</span>
            </div>
          </div>
          <div>
            <p className="text-lg">{message.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inboxfull;
