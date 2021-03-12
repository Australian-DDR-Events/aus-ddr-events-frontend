import { ReactNode } from 'react';
import { Result } from 'types/result';

export type AdminRepository = {
  uploadImage: (
    image: File,
    name: string,
    sizes: Array<number>,
  ) => Promise<Result<Error, void>>;
};

export interface UploadImage {
  (image: File, name: string, sizes: Array<number>): Promise<
    Result<Error, void>
  >;
}

export interface AdminDao {
  uploadImage: UploadImage;
}

export interface AdminRepositoryContextInterface {
  adminRepositoryInstance: AdminRepository;
}

export interface AdminRepositoryProviderOptions {
  children?: ReactNode;
  instance: AdminRepository;
}
