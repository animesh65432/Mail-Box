import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import UseSenthook from "../../customhooks/UseSenthook";

const Email = () => {
  const editor = useRef(null);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, senttomessagetouser] = UseSenthook();

  const handleSend = async () => {
    if (recipient === "" || content === "") {
      return;
    }

    try {
      let contentwithoutp = content.slice(3);
      let conttentwithoutpfromlast = contentwithoutp.replace("</p>", "");
      const emailData = {
        recipient: recipient,
        subject: subject,
        content: conttentwithoutpfromlast,
      };

      let response = await senttomessagetouser(emailData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen">
      <div className="w-full md:max-w-md">
        <div className="mb-4 flex flex-col space-y-4">
          <input
            type="email"
            placeholder="To"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            size
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 h-96"
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Email;
