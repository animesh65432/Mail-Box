import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Authslikce.js";

export const store = configureStore({
  reducer: {
    Auth: Authreducer,
  },
});
