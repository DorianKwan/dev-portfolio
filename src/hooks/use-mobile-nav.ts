import { useCallback, useEffect, useState } from 'react';
import {
  getIsMobileNavOpen,
  setIsMobileNavOpen,
  useAppDispatch,
  useAppSelector,
} from '~/app/store';
import { useEscape } from './use-escape';
import { usePathname } from 'next/navigation';

export const useMobileNav = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
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

  // handle closing the nav after next has changed pages
  useEffect(() => {
    console.log(lastPath, pathname);
    if (lastPath !== pathname) {
      dispatch(setIsMobileNavOpen(false));
      setLastPath(pathname);
    }
  }, [lastPath, pathname]);

  const setIsOpen = useCallback((openState: boolean) => {
    dispatch(setIsMobileNavOpen(openState));
  }, []);

  const toggleIsOpen = useCallback(() => {
    dispatch(setIsMobileNavOpen(!isOpen));
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    toggleIsOpen,
  };
};
