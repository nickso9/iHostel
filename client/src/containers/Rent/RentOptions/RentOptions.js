import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid';
import axios from 'axios';

const RentOptions = (props) => {

    const { title, price, description, images, userName, capacity, _id } = props.hostData
    const authToken = localStorage.getItem('auth-token')
    const [ otherUsers, setOtherUsers ] = useState('')
 
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/users/find/`, 
            params: {_id, day: props.todaysDate},
            headers: {
                'x-auth-token': authToken
            } 
        })
        .then(async response => {
            let userInfo = []
            await response.data.forEach(e => {
                userInfo.push([e.userName, e.images])
            })
            setOtherUsers(userInfo)
        })
        .catch(error => {
            console.log(error)
        })     
    }, [setOtherUsers, props.todaysDate, _id, authToken ])

       
   
        const cancelBooking = async (idOfRoom) => {
            
            // const userWantsToCancel = userData.user.id 
            // await axios({
            //     method: 'PUT',
            //     url: `http://localhost:5000/users/rent/add/${userWantsToCancel}`, 
            //     data: {
            //         roomId: idOfRoom,
            //         date: convertedDate
            //     },
            //     headers: {
            //         'x-auth-token': authToken
            //     } 
            // })
            // .then(() => {
    
            // })
            // .catch(error => {
            //     console.log(error)
            // })
        }
    
    return (
        <div>
            <h4>Booking for: <span className="text-success">{props.todaysDate} </span>at $<span className="text-success">{price}</span></h4>
            <div style={{'color': '#F481FF'}}><h5>{title}</h5></div>
            {images.map((images, index) => {      
                            if (index === 0) {
                          
                                return (
                                  <div key={v4()}>
                                <div className='main-image-container-rent d-block mt-5' id='main-image-src'><img id={v4()} alt="" src={images} /></div>
            
                                    </div>
                                    
                                )
                            } else {

                                let smallImageContainer = v4()
                        
                                return <div className='small-image-container-rent m-2' key={v4()} id={smallImageContainer}>
                                    
                                    <img 
                                        id={v4()}
                                        alt=""
                                        src={images} 
                                        onClick={(e) => {
                                            let mainImage = {
                                                src: document.getElementById('main-image-src').firstElementChild.getAttribute('src'),
                                                id: document.getElementById('main-image-src').firstElementChild.getAttribute('id'),
                                            }
                                            
                                            document.getElementById('main-image-src').firstElementChild.setAttribute('src', `${e.target.src}`)
                                            document.getElementById('main-image-src').firstElementChild.setAttribute('id', `${e.target.id}`)

                                            
                                            document.getElementById(smallImageContainer).lastElementChild.setAttribute('id', mainImage.id)
                                            document.getElementById(smallImageContainer).lastElementChild.setAttribute('src', mainImage.src)
                                            
                                            mainImage = {}              
                                        }}/></div>
                            }
                        })}
            <div className="mt-4" style={{fontSize: '18px'}}>
                <div className="text-left">
                    <div><span className="text-info">Roommates ({otherUsers.length} out of {capacity} max):</span></div>
                    <div className="d-flex m-2">
                        {otherUsers ? otherUsers.map((elem, index) => {
                            return (
                                
                                <div className="d-block mr-2" key={index}>
                                <div><img alt="avatarofuser" className="border border-secondary" src={elem[1]} style={{height: '60px', borderRadius: '25%'}}/></div>
                                <div style={{'color': '#F481FF'}}>{elem[0]}</div>
                                </div>
                                
                            )
                        })
                        : ''
                        }        
                    </div>
            

                    <div><span className="text-info mt-2">Info:</span> {description}</div>
                </div>
                <div className="mt-2 text-left"><span className="text-info">Host: </span>{userName[1].toUpperCase() + userName.slice(1)}</div>
                
                <>
                    <button
                        className="px-4 btn-warning" 
                        
                        onClick={() => { 
                            cancelBooking(_id)
                        }}   
                    >Cancel Booking</button>
                    <button
                        className="px-4 btn-dark" 
                        
                        onClick={() => {
                            
                        }}
                    >Directions</button>
                </>

            </div>
        </div>
    )
}

export default RentOptions