import { RootState } from '../store';

export const getIsMobileNavOpen = (state: RootState) => {
  return state.app.isMobileNavOpen;
};
