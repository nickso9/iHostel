// import React, { createContext, useState } from 'react';

// export const HostContext = createContext()
// export const HostContextProvider = (props) => {
//     const [host, setHost] = useState({
//         active: null,
//         capacity: null,
//         userId: null,
//         price: null,
//         description: null,
//         title: null,
//         address: {
//             addressOne: null,
//             addressTwo: '',
//             city: null,
//             state: null,
//             zip: null
//         },
//         images: [],
//         dates: [],
//     })

//     return (
//         <HostContext.Provider value={{ host, setHost}}>
//             {props.children}
//         </HostContext.Provider>
//     )

// }

import { createContext } from 'react';

export default createContext(null)

// export default HostContext