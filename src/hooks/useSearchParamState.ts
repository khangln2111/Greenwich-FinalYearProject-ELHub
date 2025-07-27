import { useSearchParams } from "react-router-dom";

// Overload 1: With defaultValue → always returns T (cannot be undefined)
export function useSearchParamState<T extends string>(
  key: string,
  defaultValue: T,
): [T, (value: T | undefined) => void];

// Overload 2: Without defaultValue → returns T | undefined
export function useSearchParamState<T extends string = string>(
  key: string,
): [T | undefined, (value: T | undefined) => void];

// Shared implementation for both overloads
export function useSearchParamState<T extends string = string>(
  key: string,
  defaultValue?: T,
): [T | undefined, (value: T | undefined) => void] {
  const [params, setParams] = useSearchParams();

  const rawValue = params.get(key) as T | null;
  const value: T | undefined = rawValue ?? defaultValue;

  const setValue = (newValue: T | undefined) => {
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
