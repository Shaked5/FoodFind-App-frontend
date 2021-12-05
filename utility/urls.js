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

export const GetAllActiveBusinessUsers = `${Base_URL}/businessuser/GetAllActiveBusinessUsers`;
export const GetBusinessUserById = `${Base_URL}/businessuser/GetBusinessUserById/`;
export const GetBusinessUserByEmail = `${Base_URL}/businessuser/GetBusinessUserByEmail/`;
export const InsertBusinessUser = `${Base_URL}/businessuser/InsertBusinessUser`;
export const LoginWithEmailAndPass = `${Base_URL}/businessuser/LoginWithEmailAndPass`;
export const UploadBusinessImg = `${Base_URL}/image/uploadimage`;



export const BusinessUsersController = {
    GetAllActiveBusinessUsers,
    GetBusinessUserById,
    GetBusinessUserByEmail,
    InsertBusinessUser,
    LoginWithEmailAndPass,
    UploadBusinessImg,
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

export const GetAllOrdersByUserID = `${Base_URL}/orders/GetAllOrdersByUserID/`
export const InsertNewOrder = `${Base_URL}/orders/InsertNewOrder`
export const InsertItemToOrder = `${Base_URL}/orderofitems/InsertItemToOrder`
export const UpdateTotalPrice = `${Base_URL}/orders/UpdateTotalPrice`
export const GetAllOfOrder = `${Base_URL}/orderofitems/GetAllItemOfOrderByOrderID/`

export const OrdersController ={
    InsertNewOrder,
    InsertItemToOrder,
    UpdateTotalPrice,
    GetAllOrdersByUserID,
    GetAllOfOrder,
}

