import { useEffect, useState } from "react";
import UseGetalltheinbox from "../../customhooks/UseGetalltheinbox";
import UsedeletetheEmail from "../../customhooks/UsedeletetheEmail";
import { Link } from "react-router-dom";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, fetchAllTheInboxEmail] = UseGetalltheinbox();
  const [emailloading, deletetheemail] = UsedeletetheEmail();

  const fetchData = async () => {
    try {
      let data = await fetchAllTheInboxEmail();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteEmail = async (id) => {
    try {
      let result = deletetheemail(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-2">Inbox {messages.length}</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {messages.map((message) => (
                <div
                  key={message._id}
                  className="mb-4 border-b border-gray-200"
                >
                  <p className="text-lg font-semibold">
                    Sender: {message.sender.email}
                  </p>
                  <div className="mt-2">
                    <h3 className="text-xl font-semibold mb-1">Content:</h3>
                    <ul>
                      {message.content.map((content) => (
                        <li
                          key={content._id}
                          className="flex items-center justify-between py-2"
                        >
                          <div>{content.content}</div>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleDeleteEmail(content._id)}
                              className="bg-red-700 hover:bg-red-500 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:ring focus:ring-red-400"
                            >
                              {emailloading ? "Loading" : "Delete"}
                            </button>
                            <Link
                              to={`/messages/${content._id}`}
                              className="text-blue-500 font-semibold hover:underline"
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

export default Inbox;
