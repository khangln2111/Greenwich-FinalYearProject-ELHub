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

export const moveItemBetweenArrays = <T>(
  source: T[],
  destination: T[],
  sourceIndex: number,
  destinationIndex: number,
) => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [moved] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destinationIndex, 0, moved);
  return { source: sourceClone, destination: destClone, moved };
};
