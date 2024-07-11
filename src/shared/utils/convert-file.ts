const toBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const convertFile = async (file: File) => {
  const base64File = (await toBase64(file as File)) as unknown as string;
  return base64File
};
