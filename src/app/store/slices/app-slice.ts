import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AppState {
  isMobileNavOpen: boolean;
}

const initialState: AppState = {
  isMobileNavOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsMobileNavOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isMobileNavOpen = payload;
    },
  },
});

export const { setIsMobileNavOpen } = appSlice.actions;
