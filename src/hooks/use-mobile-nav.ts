import { useCallback, useEffect } from 'react';
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

  // in case the use resizes their browser; close nav
  useEffect(() => {
    const handleWindowResize = () => {
      if (isOpen) {
        dispatch(setIsMobileNavOpen(false));
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [isOpen]);

  const setIsOpen = useCallback(() => {
    dispatch(setIsMobileNavOpen(!isOpen));
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
  };
};
