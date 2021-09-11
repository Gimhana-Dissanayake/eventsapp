export const delay = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getFileExtension = (filename: string) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};
