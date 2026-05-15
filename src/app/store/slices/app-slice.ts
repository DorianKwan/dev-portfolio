import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isMobileNavOpen: boolean;
  isContactDrawerOpen: boolean;
  isChatOpen: boolean;
}

const initialState: AppState = {
  isMobileNavOpen: false,
  isContactDrawerOpen: false,
  isChatOpen: false,
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
    setIsChatOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isChatOpen = payload;
    },
  },
});

export const { setIsMobileNavOpen, setIsContactDrawerOpen, setIsChatOpen } =
  appSlice.actions;
