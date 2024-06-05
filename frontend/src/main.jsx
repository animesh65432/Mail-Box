import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Reduex";
import { BrowserRouter } from "react-router-dom";

const Root = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(Root, document.getElementById("root"));
