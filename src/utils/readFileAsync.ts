export const readFileAsync = async (imageFile: File) => {
  return await new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = reject;

    fileReader.readAsDataURL(imageFile);
  });
};
