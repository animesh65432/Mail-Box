import { useEffect, useState } from "react";
import UseGetalltheinbox from "../../customhooks/UseGetalltheinbox";
import UsedeletetheEmail from "../../customhooks/UsedeletetheEmail";

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
                <div key={message._id} className="mb-4">
                  <p>Sender: {message.sender.email}</p>
                  <div>
                    <h3>Content:</h3>
                    <ul>
                      {message.content.map((content) => (
                        <div key={content._id}>
                          {content.content}
                          <button
                            onClick={() => handleDeleteEmail(content._id)}
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

export default Inbox;
