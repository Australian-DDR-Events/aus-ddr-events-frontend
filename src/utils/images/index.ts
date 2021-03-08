import Resizer from 'react-image-file-resizer';

const resizeImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<File> =>
  new Promise((resolve) => {
    const setResult = (resultingFile: File) => {
      resolve(resultingFile);
    };
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'PNG',
      100,
      0,
      setResult,
      'file',
      0,
      0,
    );
  });
export default resizeImage;
