import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  email: "",
  profile_picture: "",
  gender: "",
  phone: "",
  date_of_birth: "",
  password: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    editName: (state, action) => {
      state.name = action.payload;
    },
    editEmail: (state, action) => {
      state.email = action.payload;
    },
    editPicture: (state, action) => {
      state.profile_picture = action.payload;
    },
    editGender: (state, action) => {
      state.gender = action.payload;
    },
    editPhone: (state, action) => {
      state.phone = action.payload;
    },
    editBirth: (state, action) => {
      state.date_of_birth = action.payload;
    },
    editPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const {
  editName,
  editEmail,
  getProfile,
  editPicture,
  editGender,
  editPhone,
  editBirth,
  editPassword,
} = profileSlice.actions;
export const selectProfile = (state) => state.profile;
export default profileSlice.reducer;
