export const createListItems = () => {
  let result: number[] = [];
  for (let i = 0; i < 100000; i++) {
    result.push(i)
  }
  return result
}