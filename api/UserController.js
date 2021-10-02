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
    const req = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(user),
    };
    const value = await fetch('https://localhost:44302/api/InsertNewUser', req)
        .then((res) => {
            if (res.status === 200) {
                console.log(res.json)
                return res.json();
            }
            else if (res.status === 409) return "Conflict";
            return null;
        })
        .catch((ex) => {
            console.error("insertNewUser ex", ex.Message);
            return null;
        });
    return value;
};