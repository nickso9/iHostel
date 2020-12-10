import React, { useContext, useEffect, useState } from 'react'
import HostContext from '../../../contexts/HostContext'
import { format } from 'date-fns'
import axios from 'axios'
import { Chart } from 'react-charts'


const HostDashboard = () => {

    const { host } = useContext(HostContext)
    const authToken = localStorage.getItem('auth-token')
    const convertedDate = format(new Date(), 'MMM d, yyyy')
    const [ userHistory, setUserHistory  ] = useState([])

    

    useEffect(() => {
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
                    setUserHistory([response.data[0], response.data[1]])         
                })
                .then(() => {
                    
                    
                })
                .catch(error => console.log(error))  
        }
    
        if (host.id) {
            hostGlance(host.id)      
        }
    },[setUserHistory, authToken, host, convertedDate])
    
        const historyArray = {}
        
        if (userHistory[1]) { 
            for (const values of userHistory[1]) {
                let day = values.day
                historyArray[day] = historyArray[day] + host.price || host.price
            }
        } 

        const data = React.useMemo(
          () => [
            {
              dataType: "ordinals",
              label: 'Series 1',
              data: Object.entries(historyArray)

            },
            
          ],
          [historyArray]
        )
       
        const axes = React.useMemo(
          () => [
            { primary: true, min: 0, type: 'ordinal', position: 'bottom'},
            { position: 'left', type: 'linear', stacked: false}
          ],
          []
        )
        const series = React.useMemo(
            () => ({
              type: 'line',
            }),
            []
          )

            let userHistoryComp;
            if (userHistory[0] !== undefined) {
                if (userHistory[0].length > 0) {
                    
                    {
                        userHistoryComp = (
                        userHistory[0].map((ele, index) => {
                            return (
                                <div key={index} style={{width: '100px'}} className="text-center d-inline-block mx-3" >
                                    <div><img alt="avatarofuser" src={ele.images} style={{height: '60px', borderRadius: '25%'}}/></div>
                                    <div>{ele.userName}</div>
                                </div>
                            )
                        }) 
                        )
                    }
                    
                } else {
                    userHistoryComp = (
                    <div className="text-center p-3">No current guests.</div>
                    )
                }
            }

    
    return (
        <div className="mt-4">
            
            <div className="">
                <span>Current guests for tonight ({convertedDate}):</span>
            </div>
            <div className="p-3 mt-3">
                {userHistoryComp}
            </div>
            
            <div className="mt-4">
                <table className="text-center mx-auto">
                    <tbody>
                        <tr className="border border-dark">
                            <th className="border border-dark px-4">Total Guests</th>
                            <th className="border border-dark px-4">Rate</th>
                            <th className="border border-dark px-4">Total Revenue</th>
                        </tr>
                        <tr className="border border-dark">
                            <td className="border border-dark px-4">{userHistory[1] && userHistory[1].length}</td>
                            <td className="border border-dark px-4">${host.price}</td>
                            <td className="border border-dark px-4">${userHistory[1] && userHistory[1].length * host.price}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="mt-5" style={{maxWidth: '650px', height: '300px', margin: 'auto'}}>
                {userHistory[1] && userHistory[1].length === 0 ? <div className="text-center">No data to display.</div> : '' }
                    {userHistory[1] && <Chart data={data} axes={axes} series={series}/>}    
                </div>




            </div>


        </div>
    )
}

export default HostDashboard