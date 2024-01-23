import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'types/types.ts';

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setLoggedIn, setAccessToken, setRefreshToken, logout } = authSlice.actions;
export default authSlice.reducer;