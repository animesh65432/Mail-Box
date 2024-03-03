import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { database } from "../../assets/Needed";
import { useSelector } from "react-redux";

const Inboxfull = () => {
  const { id } = useParams();
  const currentuseremail = useSelector((state) => state.Auth.email);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let withoutcom = currentuseremail.split(".");
        const usersperation = withoutcom[0] + withoutcom[1];
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