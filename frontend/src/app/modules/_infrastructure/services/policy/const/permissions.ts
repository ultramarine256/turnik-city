export type Roles = {
  root: 'root';
  admin: 'admin';
  user: 'user';
  guest: 'guest';
};

export type Permissions = {
  isAuthorized: boolean;
  global: {
    canAll: boolean;
    canCreate: boolean;
    canRetrieve: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    own: {
      canAll: boolean;
      canRetrieve: boolean;
      canUpdate: boolean;
      canDelete: boolean;
    };
  };
  user: {
    canAll: boolean;
    canCreate: boolean;
    canRetrieve: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    own: {
      canAll: boolean;
      canRetrieve: boolean;
      canUpdate: boolean;
      canDelete: boolean;
    };
    canChangePassword: boolean;
  };
  playground: {
    canAll: boolean;
    canCreate: boolean;
    canRetrieve: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    own: {
      canAll: boolean;
      canRetrieve: boolean;
      canUpdate: boolean;
      canDelete: boolean;
    };
  };
  navigation: {
    home: boolean;
    profile: boolean;
  };
};
