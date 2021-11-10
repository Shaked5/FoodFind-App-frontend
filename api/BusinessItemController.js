import { BusinessItemController } from "../utility/urls";

///////////GET Methods
export const GetBusinessItemsByBusinessID = async (businessID) => {
  const req = {
    method: "GET",
  };
  try {
    const res = await fetch(
      BusinessItemController.GetAllBusinessItemsByBusinessId + `${businessID}`,
      req
    );
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetBusinessItemNameById = async (itemID) => {
  const req = {
    method: "GET",
  };
  try {
    const res = await fetch(
      BusinessItemController.GetBusinessItemNameById + `${itemID}`,
      req
    );
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

////////////////// UPDATE
export const UpdateItemOfBusiness = async (
  businessID,
  itemID,
  itemPrice,
  comment
) => {
  const req = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      businessID: businessID,
      itemID: itemID,
      itemPrice: itemPrice,
      comment: comment,
    }),
  };

  try {
    const res = await fetch(BusinessItemController.UpdateItemOfBusiness, req);
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const UpdateToppingToUnActive = async (
  businessID,
  itemID,
  toppingID
) => {
  const req = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      businessID: businessID,
      itemID: itemID,
      toppingID: toppingID,
    }),
  };

  try {
    const res = await fetch(
      BusinessItemController.UpdateToppingToUnActive,
      req
    );
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return parseInt(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const UpdateToppingToActive = async (
  businessID,
  itemID,
  toppingID
) => {
  const req = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      businessID: businessID,
      itemID: itemID,
      toppingID: toppingID,
    }),
  };

  try {
    const res = await fetch(
      BusinessItemController.UpdateToppingToActive,
      req
    );
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const UpdateToppingPrice = async (
  businessID,
  itemID,
  toppingID,
 toppingPrice,
  
) => {
  const req = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      businessID: businessID,
      itemID: itemID,
      toppingID:toppingID,
      toppingPrice: toppingPrice,
      
    }),
  };

  try {
    const res = await fetch(BusinessItemController.UpdateToppingPrice, req);
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

////////////INSERT Methods
export const InsertItemOfBusinessUser = async (
  itemName,
  businessID,
  itemPrice,
  comment
) => {
  const req = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      itemName: itemName,
      businessID: businessID,
      itemPrice: itemPrice,
      comment: comment,
    }),
  };
  try {
    const res = await fetch(
      BusinessItemController.InsertItemOfBusinessUser,
      req
    );
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertTopping = async (
  toppingName,
  businessID,
  itemID,
  toppingPrice,
  isActive
) => {
  const req = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      toppingName: toppingName,
      businessID: businessID,
      itemID: itemID,
      toppingPrice: toppingPrice,
      isActive: isActive,
    }),
  };
  try {
    const res = await fetch(BusinessItemController.InsertToppingOfItem, req);
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const DeleteItemOfBusiness = async (businessID,itemID) => {
  const req = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      businessID: businessID,
      itemID: itemID
    }),
  };
  try {
    const res = await fetch(
      BusinessItemController.DeleteItemOfBusiness,
      req
    );
    if (res.status !== 201 && res.status !== 200) return "Conflict";
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};