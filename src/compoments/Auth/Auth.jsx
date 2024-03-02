import React from "react";

const Auth = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Sign up</h1>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2 mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2 mb-3"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded px-3 py-2 mb-3"
          />
          <button className="w-full bg-blue-500 text-white rounded px-4 py-2">
            Sign up
          </button>
          <p className="mt-4 text-center text-sm">
            Have an Account?{" "}
            <a href="#" className="text-blue-500">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
