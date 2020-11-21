import React, { createContext, useState } from 'react';


export const newHost = createContext()



const hostContextProvider = (props) => {
    const [host, setHost] = useState({
        hostId: null,
        price: null,
        address: {
            addressOne: null,
            addressTwo: null,
            city: null,
            state: null,
            zip: null
        },
        images: [],
        dates: []
    })

    return (
        <newHost.Provider value={host}>

        </newHost.Provider>
    )


}

export default hostContextProvider