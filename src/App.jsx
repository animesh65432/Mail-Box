import { useState } from "react";
import Email from "./compoments/Email/Email";
import { Route, RouterProvider, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./compoments/Auth/Auth";
import Inbox from "./compoments/inbox/Inbox";
const App = () => {
  const currentuseremail = useSelector((state) => state.Auth.email);
  const isuserexist = !!currentuseremail;

  return (
    <>
      {isuserexist ? (
        <div>
          <Routes>
            <Route path="/" element={<Email />}></Route>
            <Route path="/inbox" element={<Inbox />}></Route>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />}></Route>
        </Routes>
      )}
    </>
  );
};

export default App;
