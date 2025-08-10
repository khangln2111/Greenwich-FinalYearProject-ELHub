import { useSearchParams } from "react-router-dom";

function parseValue<T>(value: string | null, defaultValue?: T): T | null {
  if (value === null) return defaultValue ?? null;

  // Parse based on type of default value (if yes)
  if (typeof defaultValue === "number") return Number(value) as T;
  if (typeof defaultValue === "boolean") return (value === "true") as T;
  if (typeof defaultValue === "string") return value as T;

  return value as T;
}

function serializeValue<T>(value: T | null): string | null {
  if (value === null) return null;
  return String(value);
}

// Overload 1: With defaultValue → always returns T (cannot be null)
export function useSearchParamState<T>(
  key: string,
  defaultValue: T,
): [T, (value: T | null) => void];

// Overload 2: Without defaultValue → returns T or null
export function useSearchParamState<T = string>(key: string): [T | null, (value: T | null) => void];

// Shared implementation
export function useSearchParamState<T = string>(
  key: string,
  defaultValue?: T,
): [T | null, (value: T | null) => void] {
  const [params, setParams] = useSearchParams();

  const rawValue = params.get(key);
  const value = parseValue(rawValue, defaultValue);

  const setValue = (newValue: T | null) => {
    const updatedParams: Record<string, string> = {};
    params.forEach((val, k) => {
      updatedParams[k] = val;
    });

    const serialized = serializeValue(newValue);
    if (serialized === null) {
      delete updatedParams[key];
    } else {
      updatedParams[key] = serialized;
    }

    setParams(updatedParams);
  };

  return [value, setValue] as any;
}
