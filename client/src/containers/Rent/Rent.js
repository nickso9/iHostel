import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { format } from 'date-fns'
import UserContext from '../../contexts/UserContext'
import RentOptions from './RentOptions/RentOptions'

const Rent = () => {

    const { userData } = useContext(UserContext)
    const [rentPlaces, setRentPlaces] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ userHasBooked, setUserHasBooked ] = useState(false)

    const authToken = localStorage.getItem('auth-token')
    const convertedDate = format(new Date(), 'MMM d, yyyy')
    let renterOption;

    useEffect(() => {
      
        const searchLocation = async () => {
            await axios.get('http://localhost:5000/users/rent',
             { 
                 params: { 
                     user: userData.user.id,
                     date: convertedDate
            }}) 
            .then(async response => {
                
                if (response.data.hosted) {
                    console.log('already rent.js hosted')  
                
                    setRentPlaces(response.data.alreadyHosted)
                    setUserHasBooked(true)
                    
                } else {
                    console.log(response.data)
                    let upgradedRes = await [...response.data].filter(ele => { 
                        console.log(ele.usersYes)
                    if (ele.usersYes.length === 0) {
                        console.log('hihi')
                        return ele
                    } else if (ele.usersYes.filter(e => e.day === convertedDate).length < ele.capacity)  {
                        console.log('hihasdasdi')
                        return ele            
                    } else {
                        console.log('NONE FOUND')
                    }
                    
                })

                // it was <= 0
                    if (upgradedRes.length > 0) {
                        setRentPlaces(upgradedRes)
                        
                    // } else {     
                    // let randomNum = Math.floor(Math.random()*response.data.length)
                    //  setRentPlaces([response.data[randomNum]])
                    // 
                    } 
                } 
            })
            .catch(error => console.log(error))
       
        }
        searchLocation()
        
    }, [userData.user.id, loading, convertedDate, setRentPlaces]);

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

            setLoading(false)
    }

    const userSaysYes = async (idOfRoom) => {
        const userSaysYes = userData.user.id     
            await axios({
                method: 'POST',
                url: `http://localhost:5000/users/rent/add/${userSaysYes}`, 
                data: {
                    roomId: idOfRoom,
                    date: convertedDate
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
        // console.log(rentPlaces)
        // const { description, price, title, images, userName, _id, capacity } = rentPlaces[randomNum]
        const { description, price, title, images, userName, _id, capacity } = rentPlaces[0]
        
        return (
            <div className="renter-option-div text-center" id={5}>
                <div>{userName}</div>
                <div><h2>{title}</h2></div>
                <div>{price}</div>
                <div>{capacity}</div>
                    {images.map((image, index) => {
                        return (
                            <img src={image} alt={title} key={index}/>
                        )
                    })}
                <div>{description}</div>
                <div className="d-flex justify-content-between my-3">

                        <>
                            <Button 
                                className="px-4" 
                                variant="danger" 
                                onClick={() => {     
                                    userSaysNo(_id)   
                                }}   
                            >no</Button>
                            <Button 
                                className="px-4" 
                                variant="success" 
                                onClick={() => {
                                    userSaysYes(_id)
                                    setLoading(true)
                                }}
                            >rent</Button>
                        </>
                    
                 
                </div>
            </div>    
        )
        
    }
    
    let userBookedStyle;
        if (userHasBooked) {
            userBookedStyle = {
                backgroundColor: '#1F6284',
                color: 'white'
            }
        }
     
    // if (loading === false) {
        if (userHasBooked) {
        
            renterOption = <RentOptions hostData={rentPlaces[0]} todaysDate={convertedDate} setUserHasBooked={setUserHasBooked}/>
        }
        else if (rentPlaces.length > 0) {
            renterOption = loadOption()
        } else {
            // renterOption = <div>no matches</div>
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