export const readLocalFile = async (fileName: string) => {
  const response = await fetch("/" + fileName);
  const blob = await response.blob();

  const file = new File([blob], fileName, { type: blob.type });

  return file;
};
