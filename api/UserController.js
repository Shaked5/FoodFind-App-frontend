import { UsersController } from '../utility/urls';

export const getAllUsers = async () => {
    const value = await fetch(UsersController.GetAllUsers)
        .then((res) => {
            if (res.status == 200) return res.json();
            return null;
        })
        .catch((ex) => {
            console.log("getAllUsers ex", ex);
            return null;
        });
    return value;
};

export const GetUserByEmail = async(email)=> {
    const req = {
        method: "GET",
     
    };
    try{
        const res = await fetch(UsersController.GetUserByEmail + `?email=${email}`,req);
        if(res.status!==200) return null;
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }

}



export const insertNewUser = async (user) => {
    const req = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
    try{
        const res = await fetch('http://proj14.ruppin-tech.co.il/api/user/InsertNewUser',req);
        if(res.status!==200) return null;
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
};