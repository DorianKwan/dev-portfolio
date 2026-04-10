import { useCallback, useEffect } from 'react';

export const useEscape = (onEscape: () => void) => {
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    },
    [onEscape],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);
};
