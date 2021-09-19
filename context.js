import React from "react";

const FoodFindContext = React.createContext({});

function FoodFindProvider({children}){
    const [user,setUser] = React.useState(null);
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
   

    const value = {user, setUser, isDarkTheme, setIsDarkTheme};
    return <FoodFindContext.Provider value={value}>{children}</FoodFindContext.Provider>
}

export {FoodFindProvider, FoodFindContext};