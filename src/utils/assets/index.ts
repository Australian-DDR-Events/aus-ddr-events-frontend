export const getAssetUrl = (imageUrl: string) =>
  `${process.env.ASSETS_URL}${imageUrl}`;

const DEFAULT_PROFILE_PICTURE_URL = 'https://i.imgur.com/o0ulS6k.png';
export const getProfileImageUrl = (profilePictureUrl: string) =>
  profilePictureUrl
    ? `${process.env.ASSETS_URL}${profilePictureUrl}`
    : DEFAULT_PROFILE_PICTURE_URL;

type AllowedBadgeSizes = 32 | 64 | 128 | 256 | 512;

export const badgeIdToAsset = (id: string, size: AllowedBadgeSizes) => {
  return `${process.env.ASSETS_URL}/badges/${id}.${size}.png`;
};

type AllowedAvatarSizes = 128 | 256;

export const dancerIdToAvatar = (id: string, size: AllowedAvatarSizes) => {
  return `${process.env.ASSETS_URL}/profile/avatar/${id}.${size}.png`;
};

type AllowedSongJacketSizes = 64 | 256 | 512;

export const songIdToJacket = (id: string, size: AllowedSongJacketSizes) => {
  return `${process.env.ASSETS_URL}/songs/${id}.${size}.png`;
};
