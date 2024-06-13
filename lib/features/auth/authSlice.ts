"use client";

import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { signupRequest, loginRequest } from "./authAPI";
import { getLocalUser, setLocalUser } from "@/lib/utils";

export interface AuthSliceState extends SignUp, SignIn {
  isLoading: boolean;
  token: string;
  refreshToken: string;
  user: User;
}

const localStorageUserData = getLocalUser();
const initialState: AuthSliceState = {
  email: localStorageUserData.user?.email ?? "",
  password: "",
  name: localStorageUserData.user?.name ?? "",
  isLoading: false,
  token: localStorageUserData.tokenObj?.token ?? "",
  refreshToken: localStorageUserData.tokenObj?.refreshToken ?? "",
  user: {
    email: localStorageUserData.user?.email ?? "",
    name: localStorageUserData.user?.name ?? "",
    id: localStorageUserData.user?.id ?? "",
  },
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    login: create.asyncThunk(
      async (loginData: SignIn) => {
        const response = await loginRequest(loginData);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.user = action.payload.user;
          setLocalUser(state.user, state.token, state.refreshToken);
          window.location.href = "/";
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      }
    ),
    signup: create.asyncThunk(
      async (signupData: SignUp) => {
        const response = await signupRequest(signupData);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.user = action.payload.user;
          setLocalUser(state.user, state.token, state.refreshToken);
          window.location.href = "/";
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectToken: (auth) => auth.token,
    selectRefreshToken: (auth) => auth.refreshToken,
    selectUser: (auth) => auth.user,
  },
});

// Action creators are generated for each case reducer function.
export const { login, signup } = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectToken, selectRefreshToken, selectUser } =
  authSlice.selectors;
