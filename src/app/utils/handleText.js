//Function Count Words
export const countWords = (content) => {
  if (!content.trim()) {
    return 0;
  }
  const words = content.trim().split(/\s+/);
  return words.length;
};
