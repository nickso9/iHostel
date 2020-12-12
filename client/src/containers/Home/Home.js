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
        <div className="p-5 rent-chart-page-div bg-light">
            <div className="">
                {userData.user.images && <img alt="profile image" className="border border-1" src={userData.user.images} style={{width: "100px"}}/>}
                <h1 className="text-left mt-4">Hi {userName} !</h1>
                <div className="mt-5">
                <span><strong>Travel history at a glance:</strong></span>
                </div>
            </div>

            <RentChart />
        </div>
        
        )
    } else {
        landingPage = (
            <div className="rent-chart-page-div p-5 bg-light">
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