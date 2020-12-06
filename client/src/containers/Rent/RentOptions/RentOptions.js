import React, { useEffect } from 'react'
import { v4 } from 'uuid';
import axios from 'axios';

const RentOptions = (props) => {

   const { title, price, description, images, userName, capacity, usersYes } = props.hostData
   const authToken = localStorage.getItem('auth-token')
  
   useEffect(() => {
        let arrayOfusers = []
        for (const key in usersYes) {
        if (usersYes[key].day === props.todaysDate) {
                arrayOfusers.push(usersYes[key].user)
        }
   }

        axios({
            method: 'GET',
            url: `http://localhost:5000/users/find/`, 
            params: [arrayOfusers],
            headers: {
                'x-auth-token': authToken
            } 
        })
        .then(() => {

        })
        .catch(error => {
            console.log(error)
        })

        }, [usersYes])

    
   
    
    return (
        <div>
            <h4>Booking for: <span className="text-success">{props.todaysDate} </span>at $<span className="text-success">{price}</span></h4>
            <div style={{'color': '#F481FF'}}><h5>{title}</h5></div>
            {images.map((images, index) => {      
                            if (index === 0) {
                          
                                return (
                                  <div key={v4()}>
                                <div className='main-image-container-rent d-block mt-2' id='main-image-src'><img id={v4()} alt="" src={images} /></div>
            
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
            <div className="mt-5" style={{fontSize: '18px'}}>
                <div className="text-left">
                    
                    <div><span className="text-info">Info:</span> {description}</div>
                </div>
                <div className="mt-2 text-left"><span className="text-info">Host: </span>{userName[1].toUpperCase() + userName.slice(1)}</div>
                


            </div>
        </div>
    )
}

export default RentOptions