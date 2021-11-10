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
export const LoginWithEmailAndPass = `${Base_URL}/businessuser/LoginWithEmailAndPass`;


export const BusinessUsersController = {
    GetAllBusinessUsers,
    GetBusinessUserById,
    GetBusinessUserByEmail,
    InsertBusinessUser,
    LoginWithEmailAndPass,
};


export const GetAllBusinessItemsByBusinessId = `${Base_URL}/businessitems/GetAllBusinessItemsByBusinessId/`;
export const GetBusinessItemNameById = `${Base_URL}/businessitems/GetItemById/`

export const InsertItemOfBusinessUser = `${Base_URL}/businessitems/InsertItemOfBusinessUser`;
export const InsertToppingOfItem = `${Base_URL}/businessitems/InsertToppingOfItem`;

export const UpdateItemOfBusiness = `${Base_URL}/businessitems/UpdateItemOfBusiness`;
export const UpdateToppingToUnActive = `${Base_URL}/businesstoppingsitem/UpdateToppingToUnActive`;
export const UpdateToppingToActive = `${Base_URL}/businesstoppingsitem/UpdateToppingToActive`;

export const DeleteItemOfBusiness = `${Base_URL}/businessitems/DeleteItemOfBusinessById`;

export const UpdateToppingPrice = `${Base_URL}/businesstoppingsitem/UpdateToppingPrice`;

export const BusinessItemController = {
    GetAllBusinessItemsByBusinessId,
    GetBusinessItemNameById,


    InsertItemOfBusinessUser,
    InsertToppingOfItem,

    UpdateItemOfBusiness,
    UpdateToppingToUnActive,
    UpdateToppingToActive,
    UpdateToppingPrice,

    DeleteItemOfBusiness,

}