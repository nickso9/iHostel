import React, { useEffect, useContext } from 'react';
import axios from 'axios'
import UserContext from '../../../../contexts/UserContext'

const RentChart = () => {

    const { userData } = useContext(UserContext)
    const authToken = localStorage.getItem('auth-token')

    useEffect(() => {
        getGlance()
    })
    

    const getGlance = async () => {
        await axios({
            method: 'GET',
            url: `http://localhost:5000/users/userglance/${userData.user.id}`,
            headers: {
                'x-auth-token': authToken
            } 
        })
        .then(() => {
            
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return (
        <div>hi</div>

    )

}

export default RentChart


