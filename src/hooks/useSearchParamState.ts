import { useSearchParams } from "react-router-dom";

export function useSearchParamState<T extends string = string>(
  key: string,
  defaultValue?: T,
): [T, (value: T) => void] {
  const [params, setParams] = useSearchParams();

  const value = (params.get(key) as T | null) ?? defaultValue ?? ("" as T);

  const setValue = (newValue: T) => {
    // Convert params to plain object
    const updatedParams: Record<string, string> = {};
    params.forEach((val, key) => {
      updatedParams[key] = val;
    });

    if (!newValue) {
      delete updatedParams[key];
    } else {
      updatedParams[key] = newValue;
    }

    setParams(updatedParams); // React Router sẽ tạo URLSearchParams từ plain object
  };

  return [value, setValue];
}
