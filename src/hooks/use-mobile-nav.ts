import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useEscape } from './use-escape';

export const useMobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  useEscape(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // in case the use resizes their browser; close nav
  useEffect(() => {
    const handleWindowResize = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [isOpen]);

  // handle closing the nav after next has changed pages
  useEffect(() => {
    if (lastPath !== pathname) {
      setIsOpen(false);
      setLastPath(pathname);
    }
  }, [lastPath, pathname]);

  const toggleIsOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    toggleIsOpen,
    pathname,
    lastPath,
  };
};
