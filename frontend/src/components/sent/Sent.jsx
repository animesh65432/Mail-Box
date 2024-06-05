import { useEffect, useState } from "react";
import UseGetSentEmail from "../../customhooks/UseGetAllSentEmail";

const Sent = () => {
  const [messages, setMessages] = useState([]);
  const [loading, fetchAllSentEmail] = UseGetSentEmail();

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-2">
            Sent Emails {messages.length}
          </h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <p>Sender: {message.sender.email}</p>
                  <p>Subject: {message.subject}</p>
                  <div>
                    <h3>Content:</h3>
                    <ul>
                      {message.content.map((content, i) => (
                        <li key={i}>{content.content}</li>
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
