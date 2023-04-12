import React, { createContext, useState, useEffect } from "react";

export const authContext = createContext();

export default function CknContext({ children }) {
    const [navbarShow, setNavbarShow] = useState(false);
    const [userDetails, setUserDetails] = useState([]);



    useEffect(() => {

    }, [0]);


    return (
        <authContext.Provider
            value={{
                navbarShow, setNavbarShow,
                userDetails, setUserDetails
            }}
        >
            {children}
        </authContext.Provider>
    );
}
