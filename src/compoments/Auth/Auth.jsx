import React, { useRef, useState } from "react";
import axios from "axios";
import { signin, signup, webkey } from "../../assets/Needed";
import { useDispatch } from "react-redux";
import { gettheemail, deltetheemail } from "../../Reduex/Authslikce";

const Auth = () => {
  const emailref = useRef();
  const passwordref = useRef();
  const Confirmpasswordref = useRef();
  const [toggole, setToggole] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const OnToggole = () => {
    setToggole((prev) => !prev);
  };

  const OnuserClick = async () => {
    setLoading(false);
    let password = passwordref.current.value;
    let email = emailref.current.value;
    if (password === "" || email === "") {
      setError(true);
      setLoading(true);
      return;
    }
    if (toggole) {
      let Confirmpassword = Confirmpasswordref.current.value;

      if (Confirmpassword === "" || password !== Confirmpassword) {
        setError(true);
        setLoading(true);
        return;
      } else {
        const obj = {
          email: email,
          password: password,
          returnSecureToken: true,
        };
        let totalstring = signup + webkey;
        try {
          let response = await axios.post(totalstring, obj);
          console.log(response);
        } catch (error) {
          alert(error.message);
        }
      }
    } else {
      let totalstring = signin + webkey;
      const obj = {
        email: email,
        password: password,
        returnSecureToken: true,
      };
      try {
        let response = await axios.post(totalstring, obj);
        dispatch(gettheemail(email));
      } catch (error) {
        alert(error.message);
      }
    }
    setLoading(true);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-semibold mb-4">
            {!toggole ? "Log in" : "Sign up"}
          </h1>
          <input
            type="email"
            placeholder="Email"
            className={`w-full border rounded px-3 py-2 mb-3 ${
              error && loading ? "border-red-500" : ""
            }`}
            ref={emailref}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full border rounded px-3 py-2 mb-3 ${
              error && loading ? "border-red-500" : ""
            }`}
            ref={passwordref}
          />
          {toggole && (
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full border rounded px-3 py-2 mb-3 ${
                error && loading ? "border-red-500" : ""
              }`}
              ref={Confirmpasswordref}
            />
          )}
          <button
            className="w-full bg-blue-500 text-white rounded px-4 py-2"
            onClick={OnuserClick}
            disabled={!loading}
          >
            {!toggole ? "Log in" : "Sign up"}
          </button>
          <p className="mt-4 text-center text-sm">
            {!toggole && "Have an Account"}
            <button href="#" className="text-blue-500" onClick={OnToggole}>
              {toggole ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
