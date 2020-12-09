import React, { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import RentChart from '../Rent/RentOptions/RentChart/RentChart'
import HostDashboard from '../Host/HostDashboard/HostDashboard'
import { format } from 'date-fns'

const Home = () => {
    
    const { userData } = useContext(UserContext)
    const { userName, accountType } = userData.user
    const convertedDate = format(new Date(), 'MMM d, yyyy')


  
    let landingPage;
    if (accountType === "renter") {
        landingPage = (
        <div className="border border-dark p-5">
            <div className="">
                <h1 className="text-left">Hi {userName} !</h1>
                <div className="mt-5">
                <span>Your travel history at a glance:</span>
                </div>
            </div>

            <RentChart />
        </div>
        
        )
    } else {
        // checkInnkeeper()
        landingPage = (
            <div className="border border-dark p-5">
            <div className="">
                <h1 className="text-left">Hi {userName} !</h1>
            </div>

                <HostDashboard />  
            
            </div>
            )
    }
    
    
    
    
    return (
        <>
        <div className="center-div">
         {landingPage} 
        </div>
        </>
    )
}

export default Home