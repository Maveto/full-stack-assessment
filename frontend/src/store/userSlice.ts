import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  username: string;
  email: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
};

type UserState = {
  user: User | null;
  isInitialized: boolean;
};

const initialState: UserState = {
  user: null,
  isInitialized: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setUser, clearUser, setIsInitialized } = userSlice.actions;
export default userSlice.reducer;
