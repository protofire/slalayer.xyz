import { useEffect } from "react";

export const useOnClickTarget = (
  ref: React.RefObject<HTMLElement>,
  handler?: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    if (handler === undefined) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current !== (event.target as Node)) {
        return;
      }

      handler?.(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
