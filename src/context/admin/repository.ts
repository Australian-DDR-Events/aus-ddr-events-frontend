import { Result } from 'types/result';

import { AdminDao, AdminRepository } from './types';

const adminRepository = (dao: AdminDao): AdminRepository => {
  const uploadImage = (
    image: File,
    name: string,
    sizes: Array<number>,
  ): Promise<Result<Error, void>> => dao.uploadImage(image, name, sizes);

  return { uploadImage };
};

export default adminRepository;
