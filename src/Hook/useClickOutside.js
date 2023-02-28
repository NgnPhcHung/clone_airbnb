import { useEffect } from "react";

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      // document.addEventListener("scroll", listener);
      document.addEventListener("touchend ", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        // document.removeEventListener("scroll", listener);
        document.removeEventListener("touchend ", listener);
      };
    },
    [ref, handler]
  )
}
