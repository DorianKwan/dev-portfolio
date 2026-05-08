import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isMobileNavOpen: boolean;
  isContactDrawerOpen: boolean;
}

const initialState: AppState = {
  isMobileNavOpen: false,
  isContactDrawerOpen: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsMobileNavOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isMobileNavOpen = payload;
    },
    setIsContactDrawerOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isContactDrawerOpen = payload;
    },
  },
});

export const { setIsMobileNavOpen, setIsContactDrawerOpen } = appSlice.actions;
