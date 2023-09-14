import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  isLogged: boolean;
  token: string;
}

const initialState: AuthState = {
  username: "",
  isLogged: false,
  token: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, token } = action.payload;
      state.isLogged = true;
      state.username = username;
      state.token = token;
    },
    logout: state => {
      state.isLogged = false;
      state.username = "";
      state.token = "";
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
