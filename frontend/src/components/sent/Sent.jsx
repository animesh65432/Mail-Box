import { useEffect, useState } from "react";
import UseGetSentEmail from "../../customhooks/UseGetAllSentEmail";
import UsedeletetheEmail from "../../customhooks/UsedeletetheEmail";

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
          <h1 className="text-2xl font-bold mb-2">
            Sent Emails{messages.length}
          </h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <p>
                    Recipient: {message.recipient?.email || "Unknown recipient"}
                  </p>
                  <p>Subject: {message.subject}</p>
                  <div>
                    <h3>Content:</h3>
                    <ul>
                      {message.content.map((contentItem) => (
                        <div key={contentItem._id}>
                          <li>{contentItem.content}</li>
                          <button
                            onClick={() => delettheEmail(contentItem._id)}
                          >
                            Delete
                          </button>
                        </div>
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
