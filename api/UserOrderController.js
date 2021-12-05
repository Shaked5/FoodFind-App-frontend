import {OrdersController} from '../utility/urls';


export const getAllOrdersByUserID = async(id)=> {
    const req = {
        method: "GET",
    };
    try{
        const res = await fetch(OrdersController.GetAllOrdersByUserID + `${id}`,req);
        if(res.status!==200) return null;
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }

};

export const insertNewOrder = async (order) => {
    const req = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(order),
    };
    try{
        const res = await fetch(OrdersController.InsertNewOrder,req);
        if(res.status!==200 && res.status!== 201) return console.log(res.status);
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
};

export const insertItemToOrder = async (itemList) => {
    const req = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(itemList)
    };
    try{
        const res = await fetch(OrdersController.InsertItemToOrder,req);
        if(res.status!==200 && res.status!== 201) return console.log(res.status)
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
};

export const UpdateTotalPrice = async (order) => {
    const req = {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            orderID:order.orderID,
            totalPrice:order.totalPrice
        })
    };
    try{
        const res = await fetch(OrdersController.UpdateTotalPrice,req);
        if(res.status!==200 && res.status!== 201) return console.log(res.status)
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export const getAllOfOrder  = async (orderID) => {
    const req = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
      
    };
    try{
        const res = await fetch(OrdersController.GetAllOfOrder + orderID,req);
        if(res.status!==200 && res.status!== 201) return console.log(res.status)
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}