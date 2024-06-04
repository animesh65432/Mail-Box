import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removetoekn } from "../../Reduex/Authslice";

const Header = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const Onlogooutuser = () => {
    console.log("clicked");
    dispatch(removetoekn());
    Navigate("/");
  };
  return (
    <>
      <div className="flex justify-around items-center bg-gray-200 p-4">
        <div className="bg-green-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-green-600">
          <Link to="/">
            <p>Home</p>
          </Link>
        </div>
        <div className="bg-green-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-green-600">
          <Link to="/inbox">
            <p>Inbox</p>
          </Link>
        </div>
        <div className="bg-green-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-green-600">
          <Link to="/sent">
            <p>Sent</p>
          </Link>
        </div>
        <div className="bg-green-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-green-600">
          <button onClick={Onlogooutuser}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Header;
