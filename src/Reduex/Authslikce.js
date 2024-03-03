import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    email: "",
  },
  reducers: {
    gettheemail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem("email", state.email);
    },
    deltetheemail: (state, action) => {
      state.email = action.payload;
      localStorage.removeItem("email");
    },
  },
});

export const { gettheemail, deltetheemail } = AuthSlice.actions;
export default AuthSlice.reducer;
