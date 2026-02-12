export const getColorsString = (colors?: string[]) => {
  return colors?.map((color) => color.replace("#", "")).join(",");
};
