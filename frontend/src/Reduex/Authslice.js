import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    idtoken: "" || localStorage.getItem("idtoken"),
  },
  reducers: {
    addthetoken: (state, action) => {
      state.idtoken = action.payload;
      localStorage.setItem("idtoken", action.payload);
    },
    removetoekn: (state, action) => {
      state.idtoken = "";
      localStorage.removeItem("idtoken");
    },
  },
});

export const { addthetoken, removetoekn } = AuthSlice.actions;
export default AuthSlice.reducer;
