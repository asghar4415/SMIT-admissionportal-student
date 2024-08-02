import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  email: null,
  cnic: null,
  verified: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      console.log("main", state, action);
      state.email = action.payload;
    },
    setLoading: (state, action) => {
      console.log("mae", state);
      console.log(action);
      state.loading = action.payload;
    },
    isVerified: (state, action) => {
      console.log("let redux", action.payload);
      state.verified = action.payload;
    },
    updateCnic: (state, action) => {
      console.log("let redux", action.payload);
      state.cnic = action.payload;
    },
    updateName: (state, action) => {
      console.log("let redux", action.payload);
      state.name = action.payload;
    },
  },
});

export const { updateEmail, setLoading, isVerified } = userSlice.actions;

export default userSlice.reducer;
