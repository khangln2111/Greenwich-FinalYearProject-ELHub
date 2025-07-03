export type SortDirection = "asc" | "desc";

export interface SortOption<TField extends string = string> {
  field: TField;
  direction: SortDirection;
}

export function encodeSortOption<TField extends string>(option: SortOption<TField>): string {
  return `${option.field}_${option.direction}`;
}

export function decodeSortOption<TField extends string>(
  encoded: string,
  defaultField: TField,
  defaultDirection: SortDirection = "desc",
): SortOption<TField> {
  const [field, direction] = encoded.split("_");
  if (
    (direction === "asc" || direction === "desc") &&
    field // you may validate field more strictly if needed
  ) {
    return { field: field as TField, direction };
  }

  return { field: defaultField, direction: defaultDirection };
}
