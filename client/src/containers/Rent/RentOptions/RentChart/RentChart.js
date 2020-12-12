import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios'
import UserContext from '../../../../contexts/UserContext'

const RentChart = () => {

    const { userData } = useContext(UserContext)
    const authToken = localStorage.getItem('auth-token')
    const [ userHistory, setUserHistory ] = useState([])

    useEffect(() => {
    const getGlance = async () => {
        await axios({
            method: 'GET',
            url: `http://localhost:5000/users/userglance/${userData.user.id}`,
            headers: {
                'x-auth-token': authToken
            } 
        })
        .then((response) => {
            setUserHistory(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }
    getGlance()
    },[setUserHistory, authToken, userData])
    
   

   
    return (
        <table className="mt-4">
            <tbody >
            <tr className="border border-bottom"> 
                <th className="px-4">Date</th> 
                <th className="px-4">Address</th>
                <th className="px-4">Price</th> 
                <th className="px-4">Host</th>  
            </tr> 
            {userHistory.reverse().map((info, index) => {
                return (
                    <tr key={index} className="border border-bottom"> 
                        <td className="p-4">{info.day}</td>
                        <td className="p-4">{info.address}</td>
                        <td className="p-4">${info.price}</td>
                        <td className="p-4">{info.host}</td> 
                    </tr> 
                )
            })}
            </tbody> 
             </table>



    )

}

export default RentChart


