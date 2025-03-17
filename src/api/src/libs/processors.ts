export const replaceSpaceWithHypens = (input: string): string => {
  return input.toLowerCase().replace(/\s+/g, '-');
};
