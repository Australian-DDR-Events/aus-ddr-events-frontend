import Resizer from 'react-image-file-resizer';

const resizeImage = (file: File, maxWidth: number, maxHeight: number): File => {
  let result: string | File | Blob | ProgressEvent<FileReader> = file;
  Resizer.imageFileResizer(
    file,
    maxWidth,
    maxHeight,
    'PNG',
    100,
    0,
    (image) => {
      result = image;
    },
    'file',
    0,
    0,
  );

  return result as File;
};

export default resizeImage;
