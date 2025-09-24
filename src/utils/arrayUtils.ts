export function reorderArray<T>(list: T[], startIndex: number, endIndex: number): T[] {
  // create a shallow copy of the array to avoid mutating the original array
  const result = Array.from(list);
  // remove the item from the original position
  const [removed] = result.splice(startIndex, 1);
  // insert the item at the new position
  result.splice(endIndex, 0, removed);
  // return the new array after reordering
  return result;
}
