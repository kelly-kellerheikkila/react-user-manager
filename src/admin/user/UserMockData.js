class UserMockData {}

UserMockData.mockUsers = {
  pkgs: [
    {
      id: 'Admin',
      description: 'Admin',
      maxUsers: 4,
    },
    {
      id: 'OtherPackage',
      description: 'Other Package',
      maxUsers: 7,
    },
  ],
  users: [
    { Admin: true, OtherPackage: false, userID: 'CAPHEUS', fullName: 'Capheus Onyango' },
    { Admin: false, OtherPackage: false, userID: 'KALA', fullName: 'Kala Dandekar' },
    { Admin: false, OtherPackage: true, userID: 'LITO', fullName: 'Lito Rodriguez' },
    { Admin: true, OtherPackage: true, userID: 'NOMI', fullName: 'Nomi Marks' },
    { Admin: false, OtherPackage: true, userID: 'RILEY', fullName: 'Riley Blue' },
    { Admin: false, OtherPackage: false, userID: 'SUN', fullName: 'Sun Bak' },
    { Admin: true, OtherPackage: false, userID: 'WILL', fullName: 'Will Gorski' },
    { Admin: false, OtherPackage: true, userID: 'WOLFGANG', fullName: 'Wolfgang Bogdanow' },
  ],
};

export default UserMockData;
