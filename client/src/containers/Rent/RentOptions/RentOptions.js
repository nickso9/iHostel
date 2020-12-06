import React from 'react'
import { v4 } from 'uuid';

const RentOptions = (props) => {

    const { title, price, description, images, userName, capacity, usersYes } = props.hostData
    // {userName[1].toUpperCase() + userName.slice(1)}
    return (
        <div>
            <h4>Booking for: <span className="text-success">{props.todaysDate}</span></h4>
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
            


        </div>
    )
}

export default RentOptions