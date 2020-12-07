import React, { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
// import HostContext from '../../contexts/HostContext'


const Home = () => {
    
    const { userData } = useContext(UserContext)
    // const { host } = useContext(HostContext)
    const { userName, accountType } = userData.user
    


  
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