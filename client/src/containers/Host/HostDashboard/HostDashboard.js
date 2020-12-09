import React, { useContext } from 'react'
import HostContext from '../../../contexts/HostContext'
import { format } from 'date-fns'
import axios from 'axios'



const HostDashboard = () => {

    const { host } = useContext(HostContext)
    const authToken = localStorage.getItem('auth-token')
    const convertedDate = format(new Date(), 'MMM d, yyyy')


    const hostGlance = (id) => {
        axios({
            method: "GET",
            url: `http://localhost:5000/users/hostglance/${id}`,
            params: {day: convertedDate},
            headers: {
                'x-auth-token': authToken
            } 
            })
            .then((response) => {     
                console.log(response.data[0])
                console.log(response.data[1]) 
                           
            })
            .catch(error => console.log(error))  
    }


    if (host.id) {
        hostGlance(host.id)
    }


    return (
        <div>hihihi</div>
    )
}

export default HostDashboard