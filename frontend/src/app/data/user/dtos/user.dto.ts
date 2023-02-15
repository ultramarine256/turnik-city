export type UserDto = {
  email: string;
  imageUrl: string | null;
  fullName: string;
};

export type UserProfileDto = {
  email: string;
  imageUrl: string | null;
  fullName: string;
  bio: string;
  instagramId: string;
  telegramId: string;
  city: string;
};

export type UserProfileUpdateDto = {
  email: string;
  imageUrl: string;
  fullName: string;
  bio: string;
  instagramId: string;
  telegramId: string;
  city: string;
};
