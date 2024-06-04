import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Authslice.js";

export const store = configureStore({
  reducer: {
    Auth: Authreducer,
  },
});
