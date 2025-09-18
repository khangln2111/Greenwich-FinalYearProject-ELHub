import { useEffect, useRef } from "react";

/**
 * Similar to useEffect but:
 * - Has a delay using setTimeout to avoid fake mounts in StrictMode
 * - Supports cleanup
 * - Runs again when deps change
 */
export function useDelayedEffect(
  effect: () => void | (() => void),
  deps: React.DependencyList = [],
) {
  const cleanupRef = useRef<void | (() => void)>();

  useEffect(() => {
    const timer = setTimeout(() => {
      cleanupRef.current = effect();
    }, 0);

    return () => {
      clearTimeout(timer);
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
