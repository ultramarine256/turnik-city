export type CountersDto = {
  playgrounds: number;
  users: number;
  cities: number;
  likes: number;
};

export type FreshMemberDto = {
  slug: string;
  imageUrl: string;
  fullName: string;
  instagramId: string;
  createdUtc: Date;
};

export type FreshPlaygroundDto = {
  slug: string;
  title: string;
  imageUrl: string;
  city: string;
  createdBy: string;
  createdUtc: Date;
};
