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
    const historyArray = {}

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
        

        for (const values of userHistory[1]) {
            let day = values.day
            historyArray[day] = historyArray[day] + 1 || 1
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
            { position: 'left', type: 'linear', stacked: false, min: "0"}
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
                        userHistory[0].map((ele, index) => {
                            userHistoryComp = (
                                <div key={index} style={{width: '100px'}} className="text-center d-inline-block" >
                                    <div><img alt="avatarofuser" src={ele.images} style={{height: '60px', borderRadius: '25%'}}/></div>
                                    <div>{ele.userName}</div>
                                </div>
                            )
                        }) 
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
            <div className="border border-dark p-3 mt-3">
                {userHistoryComp}
            </div>
            
            <div className="mt-5">
                <span>Revenue at a glance:</span>
                <div className="mt-4" style={{maxWidth: '450px', height: '300px', margin: 'auto'}}>
                    {userHistory[1] && <Chart data={data} axes={axes} series={series}/>}    
                </div>




            </div>


        </div>
    )
}

export default HostDashboard