import React, { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import HostContext from '../../contexts/HostContext'
// import axios from 'axios'



const Home = () => {
    
    // const authToken = localStorage.getItem('auth-token')
    const { userData } = useContext(UserContext)
    const { host, setHost } = useContext(HostContext)
    const { userName, id, accountType } = userData.user
    console.log(host)
    // const checkInnkeeper = async () => {
    //     console.log(id)
    //     await axios({
    //         method: 'GET',
    //         url: `http://localhost:5000/users/host/${id}`,
    //         headers: {
    //             'x-auth-token': authToken
    //         }     
    //     })
    //     .then(response => {
    //         console.log('akjsdhjkashd')
    //         console.log(response.data)  
    //     })
    //     .catch(error => console.log(error))
    // }
    
    

  
    let landingPage;
    if (accountType === "renter") {
        landingPage = (
        <div>Welcome {userName}</div>
        )
    } else {
        // checkInnkeeper()
        landingPage = (
            <div>
                <h2>Welcome {userName}!</h2>
                
                
            
            </div>
            )
    }
    
    
    
    
    return (
        <>
        <div className="renter-home-card">
         {landingPage} 
        </div>
        </>
    )
}

export default Home