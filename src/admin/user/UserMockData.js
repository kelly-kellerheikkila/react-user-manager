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
    { Admin: true, OtherPackage: false, userID: 'CAPHEUS', fullName: 'Capheus Onyango', favInt: 10, favNum: 10.2 },
    { Admin: false, OtherPackage: false, userID: 'KALA', fullName: 'Kala Dandekar', favInt: 23, favNum: 23.4 },
    { Admin: false, OtherPackage: true, userID: 'LITO', fullName: 'Lito Rodriguez', favInt: 84, favNum: 48.3 },
    { Admin: true, OtherPackage: true, userID: 'NOMI', fullName: 'Nomi Marks', favInt: 42, favNum: -42 },
    { Admin: false, OtherPackage: true, userID: 'RILEY', fullName: 'Riley Blue', favInt: 38, favNum: 392.3 },
    { Admin: false, OtherPackage: false, userID: 'SUN', fullName: 'Sun Bak', favInt: 109, favNum: 128.2 },
    { Admin: true, OtherPackage: false, userID: 'WILL', fullName: 'Will Gorski', favInt: '', favNum: '' },
    { Admin: false, OtherPackage: true, userID: 'WOLFGANG', fullName: 'Wolfgang Bogdanow', favInt: 219, favNum: 328.3 },
  ],
};

export default UserMockData;
