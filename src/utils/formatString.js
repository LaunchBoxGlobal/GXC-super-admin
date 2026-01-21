export const formatString = (str = "") =>
  String(str)
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
