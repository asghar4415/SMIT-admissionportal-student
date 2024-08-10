import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  email: null,
  cnic: null,
  verified: false,
  name:null,
  url:null,
  otpverified:false
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setotpVerified:(state, action) => {
      state.otpverified = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    
    setLoading: (state, action) => {
  
      state.loading = action.payload;
    },
    isVerified: (state, action) => {
      state.verified = action.payload;
    },
    updateCnic: (state, action) => {
      state.cnic = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateImgUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { updateEmail, setLoading, isVerified,updateName,updateCnic,updateImgUrl,setotpVerified } = userSlice.actions;

export default userSlice.reducer;
