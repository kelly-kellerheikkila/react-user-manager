class AppMockData {}

AppMockData.mockPermissions = {
  Admin: {
    user: {
      create: true,
      delete: true,
      read: true,
      update: true,
    },
  },
  OtherPackage: {
    optionOne: {
      create: true,
      delete: true,
      read: true,
      update: true,
    },
    optionTwo: {
      create: true,
      delete: true,
      read: true,
      update: true,
    },
  },
};

export default AppMockData;
