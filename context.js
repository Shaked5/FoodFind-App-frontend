import React from "react";

const FoodFindContext = React.createContext({});

function FoodFindProvider({children}){
    const [user,setUser] = React.useState(null);
    const [selectedBusinessToppings,setSelectedBusinessToppings] = React.useState([]);
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
   

    const value = {user, setUser, selectedBusinessToppings, setSelectedBusinessToppings, isDarkTheme, setIsDarkTheme};
    return <FoodFindContext.Provider value={value}>{children}</FoodFindContext.Provider>
}

export {FoodFindProvider, FoodFindContext};