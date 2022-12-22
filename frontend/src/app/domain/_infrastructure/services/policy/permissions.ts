export type Roles = {
  root: 'root';
  admin: 'admin';
  user: 'guest';
  guest: 'guest';
};

export type Permissions = {
  global: {
    canAll: boolean;
    canRetrieve: boolean;
    canCreate: boolean;
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
    canRetrieve: boolean;
    canCreate: boolean;
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
    canRetrieve: boolean;
    canCreate: boolean;
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
