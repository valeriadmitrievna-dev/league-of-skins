export const getChromaColorName = (chromaName: string, lang: string = 'en') => {
  const regex = /.*\(([^)]+)\)/;
  const match = chromaName.match(regex);

  return lang === "ru" ? chromaName.split("'")[chromaName.split("'").length - 3] : (match?.[1] ?? chromaName);
};
