import Email from "./compoments/Email/Email";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./compoments/Auth/Auth";
import Inbox from "./compoments/inbox/Inbox";
import Header from "./compoments/Header/Header";
import Inboxfull from "./compoments/inbox/Inboxfull";
const App = () => {
  const currentuseremail = useSelector((state) => state.Auth.email);
  const isuserexist = !!currentuseremail;

  return (
    <>
      {isuserexist ? (
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Email />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/messages/:id" element={<Inboxfull />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      )}
    </>
  );
};

export default App;
