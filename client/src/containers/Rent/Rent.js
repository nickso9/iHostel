import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { format } from 'date-fns'
import UserContext from '../../contexts/UserContext'
import RentOptions from './RentOptions/RentOptions'
import CoordsContext from '../../contexts/CoordsContext'
import { v4 } from 'uuid';

const Rent = (props) => {
    const { coords } = useContext(CoordsContext)
    const { userData } = useContext(UserContext)
    const [rentPlaces, setRentPlaces] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ userHasBooked, setUserHasBooked ] = useState(false)
    const [ emptyData, setEmptyData ] = useState(false)
    const authToken = localStorage.getItem('auth-token')
    const convertedDate = format(new Date(), 'MMM d, yyyy')
    let num = Math.floor(Math.random() * rentPlaces.length)
    let renterOption;

    useEffect(() => { 
        let convertedCoords = coords
        const searchLocation = async () => {
            
            if (convertedCoords) {
                await axios.get('http://localhost:5000/users/rent',
             { 
                 params: { 
                    coords: convertedCoords,
                    user: userData.user.id,
                    date: convertedDate
            }}) 
            .then(async response => { 
                if (await response.data.hosted) {
                    console.log('already rent.js hosted')   
                    setRentPlaces(response.data.alreadyHosted)
                    setUserHasBooked(true)   
                } else if (response.data.length === 0) {
                    setEmptyData(true)
                } else {     
                    let upgradedRes = await [...response.data].filter(ele => { 
                    if (ele.usersYes.length === 0) {                     
                        return ele
                    } else if (ele.usersYes.filter(e => e.day === convertedDate).length < ele.capacity)  {
                        return ele            
                    } else {
                          
                    }
                     
                })
                console.log(upgradedRes.length)
            
                if (upgradedRes.length > 0) {
                    setRentPlaces(upgradedRes)  
                } else {
                    setEmptyData(true)
                }   
                    
                    
                } 
            })
            .catch(error => console.log(error))
            }     
        }
        searchLocation()
    }, [userData.user.id, loading, convertedDate, setRentPlaces, coords]);

    /// working on this ///
    const userSaysNo = async (idOfRoom) => { 
        const userSaysNo = {
            day: convertedDate,
            user: userData.user.id
        }
        await axios({
            method: 'POST',
            url: `http://localhost:5000/users/rent/${idOfRoom}`,
            data: userSaysNo,
            headers: {
                'x-auth-token': authToken
            } 
            })
            .then(() => {     
                console.log('set rent places')          
            })
            .catch(error => console.log(error))
             
             setRentPlaces({
                    rentPlaces: rentPlaces.pop()
            })

            if (rentPlaces.length === 0) {
                setEmptyData(true)
            }


            setLoading(false)
    }
    
    const userSaysYes = async (idOfRoom, rentedPlace) => {
        let formAddress = rentedPlace.loc.formattedAddress.split(',')
        
        let rentHistory = {
            address: formAddress[0] + ', ' + formAddress[2] + ', ' + formAddress[3],
            price: rentedPlace.price,
            day: convertedDate,
            host: rentedPlace.userName
        }
        console.log(rentHistory)
        const userSaysYes = userData.user.id     
            await axios({
                method: 'POST',
                url: `http://localhost:5000/users/rent/add/${userSaysYes}`, 
                data: {
                    rentHistory,
                    roomId: idOfRoom,
                    date: convertedDate,
                    userName: userData.user.userName,
                    images: userData.user.images
                },
                headers: {
                    'x-auth-token': authToken
                } 
            })
            .then(() => {
                setUserHasBooked(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    


    const loadOption = () => {
        // console.log('load option')
        
        // const { description, price, title, images, userName, _id, capacity } = rentPlaces[randomNum]
        const { description, price, title, images, userName, _id } = rentPlaces[0]
        console.log(rentPlaces[num])
        
        return (
            
            <div key={5}> 
            <div className="text-right" style={{"fontSize":"40px",'color': "green", "marginTop": '-40px', "marginRight": '-20px'}}>${price}/night</div>
            <div className="renter-option-div text-center mt-4" >
                
                <div><h4>Available today: {convertedDate} !!</h4></div>
                <div><h2>{title}</h2></div>
                <div className="text-right" style={{"fontSize": '14px'}}><span style={{'color': "black"}}>Hosted by: </span><strong>{userName[0].toUpperCase() + userName.slice(1)}</strong></div>
                {images.map((image, index) => {      
                            if (index === 0) {
                          
                                return (
                                  <div key={v4()}>
                                <div className='main-image-container-rent d-block mt-4' id='main-image-src'><img id={v4()} alt="" src={image} /></div>
                                    {images.length > 1 && <span  style={{fontSize: '11px'}}>click thumbnails to see in main window</span>}
                                    </div>
                                    
                                )
                            } else {

                                let smallImageContainer = v4()
                                
                                return (
                                <div key={v4()} className="d-inline"> 
                                
                                <div className='small-image-container-rent m-3'  id={smallImageContainer}>
                                    
                                    <img 
                                        id={v4()}
                                        alt=""
                                        src={image} 
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
                                        </div>
                                )
                            }
                        })}


                
                
                <div className="mt-1 text-left"><span style={{'color': "black"}} className="d-block">Info: </span><strong>{description}</strong></div>

                <div className="d-flex justify-content-between mt-5">

                        <>
                            <Button 
                                variant="danger"
                                className="px-5" 
                                style={{"padding": "7px", "fontSize": "25px"}}
                                onClick={() => {     
                                    userSaysNo(_id)   
                                }}   
                            >no</Button>
                            <Button 
                                className="px-5" 
                                style={{"padding": "7px", "fontSize": "25px", backgroundColor: '#1F6284'}}  
                                onClick={() => {
                                    
                                    userSaysYes(_id, rentPlaces[num])
                                }}
                            >rent</Button>
                        </>
                    
                 
                </div>
            </div>  
            </div>
        )
        
    }
    
    let userBookedStyle;
        if (userHasBooked) {
            userBookedStyle = {
                backgroundColor: 'white',
                // color: '#1F6284'
                color: 'black'
            }
        }
     
    // if (loading === false) {
        if (userHasBooked) {
            console.log('hihihi')
            renterOption = <RentOptions hostData={rentPlaces[0]} todaysDate={convertedDate} setUserHasBooked={setUserHasBooked} userHasBooked={userHasBooked}/>
        }
        else if (rentPlaces.length > 0) {
            console.log(userHasBooked)
            renterOption = loadOption()
        } 

        if (emptyData) {
            renterOption = <div>:( check back tomorrow</div>
        }
            
        
    // } else {
        // renterOption = <div>loading....</div>
    // }
    
    return (
        
        <div id="rent-wrapper" style={userBookedStyle}>
                {renterOption} 
       
        </div>
    )

}

export default Rent