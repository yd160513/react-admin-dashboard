import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  username: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
