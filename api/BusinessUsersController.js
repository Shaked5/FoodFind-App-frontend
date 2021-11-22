import {BusinessUsersController} from '../utility/urls';

export const getAllBusinessUsers = async () => {
    const value = await fetch(BusinessUsersController.GetAllBusinessUsers)
        .then((res) => {
            if (res.status == 200) return res.json();
            return null;
        })
        .catch((ex) => {
            console.log("getAllBusinessUsers ex", ex);
            return null;
        });
    return value;
};

export const getBusinessUserByEmail = async(email)=> {
    const req = {
        method: "GET",
    };
    try{
        const res = await fetch(BusinessUsersController.GetBusinessUserByEmail + `?email=${email}`,req);
        if(res.status!==200) return null;
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }

};

export const insertBusinessUser = async (businessUser) => {
    const req = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(businessUser),
    };
    try{
        const res = await fetch(BusinessUsersController.InsertBusinessUser ,req);
        if(res.status!==201 && res.status!==200) return "Conflict";
        const data = await res.json(); 
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
};

export const UploadImage = async (imageObj) => {
    //שליחת המידע לשרת
    let response = await fetch(BusinessUsersController.UploadBusinessImg, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(imageObj)
    })

    //json המרה של התשובה מהשרת ל 
    let data = await response.json()

    console.log('data => ', data)

    if (data.isOk) {
      return data.path;
    }
  }

