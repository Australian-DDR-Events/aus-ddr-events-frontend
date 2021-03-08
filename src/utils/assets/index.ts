export const getAssetUrl = (imageUrl: string) =>
  `${process.env.ASSETS_URL}${imageUrl}`;

const DEFAULT_PROFILE_PICTURE_URL = 'https://i.imgur.com/o0ulS6k.png';
export const getProfileImageUrl = (profilePictureUrl: string) =>
  profilePictureUrl
    ? `${process.env.ASSETS_URL}${profilePictureUrl}`
    : DEFAULT_PROFILE_PICTURE_URL;
