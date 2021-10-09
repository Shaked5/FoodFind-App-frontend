//All URLS IS Here

const Base_URL = 'http://proj14.ruppin-tech.co.il/api';

//   USERS controller

export const GetAllUsers = `${Base_URL}/GetAllUsers`;
export const GetUserById = `${Base_URL}/GetUserById/`;
export const InsertNewUser = `${Base_URL}/InsertNewUser`;
export const GetUserByEmail = `${Base_URL}/GetUserByEmail/`

export const UsersController = {
    GetAllUsers,
    GetUserById,
    InsertNewUser,
    GetUserByEmail,
};

export const GetAllBusinessUsers = `${Base_URL}/GetAllBusinessUsers`;
export const GetBusinessUserById = `${Base_URL}/GetBusinessUserById/`;
export const GetBusinessUserByEmail = `${Base_URL}/GetBusinessUserByEmail/`;
export const InsertBusinessUser = `${Base_URL}/InsertBusinessUser`;

export const BusinessUsersController = {
    GetAllBusinessUsers,
    GetBusinessUserById,
    GetBusinessUserByEmail,
    InsertBusinessUser,
};