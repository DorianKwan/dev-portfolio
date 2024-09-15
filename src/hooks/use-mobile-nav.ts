import { useCallback } from 'react';
import {
  getIsMobileNavOpen,
  setIsMobileNavOpen,
  useAppDispatch,
  useAppSelector,
} from '~/app/store';
import { useEscape } from './use-escape';

export const useMobileNav = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(getIsMobileNavOpen);

  useEscape(() => {
    if (isOpen) {
      dispatch(setIsMobileNavOpen(false));
    }
  }, [isOpen]);

  const setIsOpen = useCallback(() => {
    dispatch(setIsMobileNavOpen(!isOpen));
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
  };
};
