import Email from "./components/email/Email";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/auth/Auth";
import Inbox from "./components/inbox/Inbox";
import Header from "./components/header/Header";
import Inboxfull from "./components/inbox/Inboxfull";
import Sent from "./components/sent/Sent";
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
            <Route path="/sent" element={<Sent />}></Route>
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
