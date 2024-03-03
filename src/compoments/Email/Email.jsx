import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const Email = () => {
  const editor = useRef(null);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSend = () => {
    const obj = {
      recipient: recipient,
      subject: subject,
      content: content,
    };
  };

  return (
    <div className="font-sans flex flex-col">
      <div className="mb-4 flex flex-col">
        <input
          type="email"
          placeholder="To"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 mb-2 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 mb-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newcontent) => setContent(newcontent)}
        tabIndex={1}
        config={{
          toolbarAdaptive: false,
          buttons: "bold,italic,underline,|,link,|,ol,ul,|,align,|,source",
          removeButtons:
            "fullsize,about,video,table,indent,outdent,brush,print,template,styles",
          disablePlugins: "source,format,media,video",
        }}
        className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 h-64 overflow-y-auto" // Added height and overflow for editor
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Send
      </button>
    </div>
  );
};

export default Email;
