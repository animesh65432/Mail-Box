import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import axios from "axios";
import { database } from "../../assets/Needed";
import { useSelector } from "react-redux";

const Email = () => {
  const editor = useRef(null);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const cuurentuseremail = useSelector((state) => state.Auth.email);

  const handleSend = async () => {
    if (recipient == "") {
      alert("please give me email");
      return;
    }
    const emailData = {
      recipient: recipient,
      subject: subject,
      content: content,
    };

    try {
      const reciver = recipient.split(".");
      const url = `${database}${reciver}/Save.json`;
      console.log(url);
      const response = await axios.post(url, emailData);
      SaveIntheAcoount(emailData);
    } catch (error) {
      alert(error.message);
    }
  };

  async function SaveIntheAcoount(obj) {
    try {
      let email = cuurentuseremail.split(".");
      let emailwihtoutcom = email[0] + email[1];
      let url = `${database}${emailwihtoutcom}sent/Save.json`;
      let reponse = await axios.post(url, obj);
      console.log(reponse);
    } catch (err) {}
  }

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
