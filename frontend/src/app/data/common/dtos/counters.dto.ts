export type CountersDto = {
  playgrounds: number;
  users: number;
  cities: number;
  likes: number;

  newMembers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  newLocations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
};

export type NewMemberDto = {
  slug: string;
  imageUrl: string;
  fullName: string;
  instagramId: string;
  createdUtc: Date;
};

export type NewPlaygroundDto = {
  slug: string;
  title: string;
  imageUrl: string;
  city: string;
  createdBy: string;
  createdUtc: Date;
};
