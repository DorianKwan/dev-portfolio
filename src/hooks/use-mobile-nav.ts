import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getIsMobileNavOpen } from '~/app/store/selectors/app-selectors';
import { useAppDispatch, useAppSelector } from '~/app/store/hooks';
import { useEscape } from './use-escape';
import { setIsMobileNavOpen } from '~/app/store/slices/app-slice';

export const useMobileNav = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const isOpen = useAppSelector(getIsMobileNavOpen);

  const handleEsc = useCallback(() => {
    if (isOpen) {
      dispatch(setIsMobileNavOpen(false));
    }
  }, [dispatch, isOpen]);

  useEscape(() => {
    handleEsc();
  });

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
  }, [dispatch, isOpen]);

  // handle closing the nav after next has changed pages
  useEffect(() => {
    if (lastPath !== pathname) {
      dispatch(setIsMobileNavOpen(false));
      // lastPath is return & consumed; useRef will not work
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLastPath(pathname);
    }
  }, [dispatch, lastPath, pathname]);

  const setIsOpen = useCallback(
    (openState: boolean) => {
      dispatch(setIsMobileNavOpen(openState));
    },
    [dispatch],
  );

  const toggleIsOpen = useCallback(() => {
    dispatch(setIsMobileNavOpen(!isOpen));
  }, [dispatch, isOpen]);

  return {
    isOpen,
    setIsOpen,
    toggleIsOpen,
    pathname,
    lastPath,
  };
};
