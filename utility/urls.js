//All URLS IS Here

const Base_URL = 'https://localhost:44302/api';

//   USERS controller

export const GetAllUsers = `${Base_URL}/GetAllUsers`;
export const GetUserById = `${Base_URL}/GetUserById/`;
export const InsertNewUser = `${Base_URL}/InsertNewUser`;

export const UsersController = {
    GetAllUsers,
    GetUserById,
    InsertNewUser,
};