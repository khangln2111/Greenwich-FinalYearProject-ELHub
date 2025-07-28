import { useSearchParams } from "react-router-dom";

// Overload 1: With defaultValue → always returns T (cannot be null)
export function useSearchParamState<T extends string>(
  key: string,
  defaultValue: T,
): [T, (value: T | null) => void];

// Overload 2: Without defaultValue → returns T or null
export function useSearchParamState<T extends string = string>(
  key: string,
): [T | null, (value: T | null) => void];

// Shared implementation
export function useSearchParamState<T extends string = string>(
  key: string,
  defaultValue?: T,
): [T | null, (value: T | null) => void] {
  const [params, setParams] = useSearchParams();

  const rawValue = params.get(key) as T | null;
  const value: T | null = rawValue ?? defaultValue ?? null;

  const setValue = (newValue: T | null) => {
    const updatedParams: Record<string, string> = {};
    params.forEach((val, k) => {
      updatedParams[k] = val;
    });

    if (newValue == null) {
      delete updatedParams[key];
    } else {
      updatedParams[key] = newValue;
    }

    setParams(updatedParams);
  };

  return [value, setValue];
}
