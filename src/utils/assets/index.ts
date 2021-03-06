// eslint-disable-next-line import/prefer-default-export
export const getAssetUrl = (imageUrl: string) =>
  `${process.env.ASSETS_URL}${imageUrl}`;
