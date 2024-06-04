import React, { useRef, useState } from "react";
import UseLoginHook from "../../customhooks/Useloginhooks";
import Usesignuphooks from "../../customhooks/Usesignuphooks";

const Auth = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(false);
  const [signupLoading, createUser] = Usesignuphooks();
  const [loginLoading, loginUser] = UseLoginHook();
  const onToggle = () => {
    setToggle((prev) => !prev);
    setError(false);
  };

  const onUserClick = async () => {
    setError(false);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError(true);
      return;
    }

    if (toggle) {
      const confirmPassword = confirmPasswordRef.current.value;
      if (!confirmPassword || password !== confirmPassword) {
        setError(true);
        return;
      }

      try {
        const response = await createUser({ email, password });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await loginUser({ email, password });
        console.log(response);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          {toggle ? "Sign Up" : "Log In"}
        </h1>
        <input
          type="email"
          placeholder="Email"
          className={`w-full border rounded px-3 py-2 mb-3 ${
            error ? "border-red-500" : ""
          }`}
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="Password"
          className={`w-full border rounded px-3 py-2 mb-3 ${
            error ? "border-red-500" : ""
          }`}
          ref={passwordRef}
        />
        {toggle && (
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full border rounded px-3 py-2 mb-3 ${
              error ? "border-red-500" : ""
            }`}
            ref={confirmPasswordRef}
          />
        )}
        <button
          className="w-full bg-blue-500 text-white rounded px-4 py-2"
          onClick={onUserClick}
        >
          {toggle ? "Sign Up" : "Log In"}
          {(loginLoading || signupLoading) && "Loading..."}
        </button>
        <p className="mt-4 text-center text-sm">
          {toggle ? "Already have an account?" : "Don't have an account?"}
          <button href="#" className="text-blue-500" onClick={onToggle}>
            {toggle ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
