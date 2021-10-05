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

export const insertNewUser = async (user) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const res = await fetch('http://10.100.102.19:44302/api/InsertNewUser', {
    //                 method: 'POST',
    //                 headers: {
    //                     "content-type": "application/json",
    //                     "accept": "application/json",
    //                     "Access-Control-Allow-Origin": "*"
    //                 },
    //                 body: JSON.stringify(user)
    //             })
    //             console.log(`url`, res);
    //             const data = await res.json();
    //             console.log('data=', data)
    //             resolve(data)
    //         }
    //         catch (error) {
    //             reject(error)
    //         }
    //     })
    // }
    console.log(user);
    const req = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
    const value = await fetch('http://proj14.ruppin-tech.co.il/api/InsertNewUser', req)
    const data = await value.json();
    console.log(data);
    // .then((res) => {
    //     console.log(res);
    //     if (res.status === 201) {
    //         return res.json();
    //     }
    //     else if (res.status === 409) return "Conflict";
    //     return null;
    // })
    // .catch((ex) => {
    //     console.error("error insert user", ex);
    //     return null;
    // });
    return data;
};