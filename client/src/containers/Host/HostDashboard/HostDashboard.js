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

    console.log(userHistory)
    
        const data = React.useMemo(
          () => [
            {
              label: 'Series 1',
              data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
              label: 'Series 2',
              data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            }
          ],
          []
        )
       
        const axes = React.useMemo(
          () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
          ],
          []
        )
    

    return (
        <div className="mt-4">
            {userHistory[0] ? userHistory[0].map((ele, index) => {
                console.log('hihi')
                console.log(ele)
                return (
                    <div key={index} style={{width: '100px'}} className="text-center d-inline-block" >
                        <div><img alt="avatarofuser" src={ele.images} style={{height: '60px', borderRadius: '25%'}}/></div>
                        <div>{ele.userName}</div>
                    </div>
                )
            }) : ''
            }

            
            <div className="mt-5">
                <div style={{maxWidth: '400px', height: '300px', margin: 'auto'}}>
                    <Chart data={data} axes={axes} />
                </div>




            </div>


        </div>
    )
}

export default HostDashboard