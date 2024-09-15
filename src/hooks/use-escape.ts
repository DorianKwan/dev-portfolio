import { useCallback, useEffect } from 'react';

export const useEscape = (
  onEscape: () => void,
  observedValues: unknown[] = [],
) => {
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    },
    [onEscape, ...observedValues],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction, onEscape, ...observedValues]);
};
