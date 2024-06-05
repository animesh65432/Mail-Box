import { useEffect, useState } from "react";
import UseGetSentEmail from "../../customhooks/UseGetAllSentEmail";
import UsedeletetheEmail from "../../customhooks/UsedeletetheEmail";
import { Link } from "react-router-dom";

const Sent = () => {
  const [messages, setMessages] = useState([]);
  const [loading, fetchAllSentEmail] = UseGetSentEmail();
  const [emailloading, deletetheemail] = UsedeletetheEmail();

  const fetchData = async () => {
    try {
      let data = await fetchAllSentEmail();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delettheEmail = async (id) => {
    try {
      let result = await deletetheemail(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-4">
            Sent Emails ({messages.length})
          </h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {messages.map((message, index) => (
                <div key={index} className="mb-6 border-b border-gray-300 pb-4">
                  <p className="text-lg font-semibold">
                    Recipient: {message.recipient?.email || "Unknown recipient"}
                  </p>
                  <p className="text-lg font-semibold">
                    Subject: {message.subject}
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Content:</h3>
                    <ul>
                      {message.content.map((contentItem) => (
                        <li
                          key={contentItem._id}
                          className="flex items-center justify-between py-2"
                        >
                          <div>{contentItem.content}</div>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => delettheEmail(contentItem._id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-400 transition duration-300"
                            >
                              {emailloading ? "Loading" : "Delete"}
                            </button>
                            <Link
                              to={`/messages/${contentItem._id}`}
                              className="text-blue-600 font-semibold hover:underline"
                            >
                              Details
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sent;
