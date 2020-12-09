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
                .catch(error => console.log(error))  
        }
    
        if (host.id) {
            console.log('hi')
            hostGlance(host.id)
            
        }
    },[setUserHistory, authToken, host, convertedDate])

    
        const data = React.useMemo(
          () => [
            {
              dataType: "ordinals",
              label: 'Series 1',
              data: [["Dec 7, 2020", 150], ["Dec 8, 2020", 225], ["Dec 9, 2020", 150], ["Dec 10, 2020", 150], ["Dec 11, 2020", 75]]

            },
            
          ],
          []
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
            console.log(data)
    return (
        <div className="mt-4">
            
            <div className="">
                <span>Current guests for tonight ({convertedDate}):</span>
            </div>
            <div className="border border-dark p-3 mt-3">
            {userHistory[0] ? userHistory[0].map((ele, index) => {
                
                return (
                    <div key={index} style={{width: '100px'}} className="text-center d-inline-block" >
                        <div><img alt="avatarofuser" src={ele.images} style={{height: '60px', borderRadius: '25%'}}/></div>
                        <div>{ele.userName}</div>
                    </div>
                )
            }) : ''
            }
            </div>
            
            <div className="mt-5">
                <span>Revenue at a glance:</span>
                <div className="mt-4" style={{maxWidth: '450px', height: '300px', margin: 'auto'}}>
                    <Chart data={data} axes={axes} series={series}/>
                </div>




            </div>


        </div>
    )
}

export default HostDashboard