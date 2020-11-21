import React, { createContext, useState } from 'react';

export const HostContext = createContext()

export const HostContextProvider = (props) => {
    const [host, setHost] = useState({
        hostId: null,
        price: '5678',
        description: null,
        title: null,
        address: {
            addressOne: null,
            addressTwo: null,
            city: null,
            state: null,
            zip: null
        },
        geoLocation: null,
        images: [],
        dates: [],
    })

    return (
        <HostContext.Provider value={{ host, setHost}}>
            {props.children}
        </HostContext.Provider>
    )

}

export default HostContext