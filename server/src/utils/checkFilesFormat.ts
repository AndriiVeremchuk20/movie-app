//function to checking availables file gormat
// @params filename like "text.txt"
// @params file formats like array formats wothod dot example: ["txt","jpg","cpp"] not(!) [".txt",".jpg",".cpp"]

const checkFilesFormat = (
  filename: string,
  availableFormats: Array<String>
): boolean => {
  const fileFormat = filename.split(".").pop();
  if (fileFormat) {
    return availableFormats.some((format) => format === fileFormat);
  }
  return false;
};

export default checkFilesFormat;
