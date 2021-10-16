//All URLS IS Here

const Base_URL = 'http://proj14.ruppin-tech.co.il/api';

//   USERS controller

export const GetAllUsers = `${Base_URL}/user/GetAllUsers`;
export const GetUserById = `${Base_URL}/user/GetUserById/`;
export const InsertNewUser = `${Base_URL}/user/InsertNewUser`;
export const GetUserByEmail = `${Base_URL}/user/GetUserByEmail/`

export const UsersController = {
    GetAllUsers,
    GetUserById,
    InsertNewUser,
    GetUserByEmail,
};

export const GetAllBusinessUsers = `${Base_URL}/businessuser/GetAllBusinessUsers`;
export const GetBusinessUserById = `${Base_URL}/businessuser/GetBusinessUserById/`;
export const GetBusinessUserByEmail = `${Base_URL}/businessuser/GetBusinessUserByEmail/`;
export const InsertBusinessUser = `${Base_URL}/businessuser/InsertBusinessUser`;

export const BusinessUsersController = {
    GetAllBusinessUsers,
    GetBusinessUserById,
    GetBusinessUserByEmail,
    InsertBusinessUser,
};