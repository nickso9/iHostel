import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { format } from 'date-fns'
import UserContext from '../../contexts/UserContext'


const Rent = () => {

    const { userData } = useContext(UserContext)
    const [rentPlaces, setRentPlaces] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ userHasBooked, setUserHasBooked ] = useState(false)

    const authToken = localStorage.getItem('auth-token')
    const convertedDate = format(new Date(), 'MMM d, yyyy')
    let renterOption;

    useEffect(() => {
        console.log(rentPlaces.length)
        const searchLocation = () => {
            // if (rentPlaces.length === 0) {
                console.log('jijijij')
            axios.get('http://localhost:5000/users/rent',
             { 
                 params: { 
                     user: userData.user.id,
                     date: convertedDate
            }})
            .then(response => {
                if (response.data.hosted) {
                    setRentPlaces(response.data.alreadyHosted)
                    setUserHasBooked(true)
                    // setLoading(false)
                } else {
                    let randomNum = Math.floor(Math.random()*response.data.length)
                    console.log(randomNum)
                    setRentPlaces([response.data[randomNum]])
                    console.log(response.data[randomNum])
                    // setLoading(false)
                } 
            })
            .catch(error => console.log(error))
        // }
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

            })
            .catch(error => {
                console.log(error)
            })
    }

    const cancelBooking = async (idOfRoom) => {
        console.log('hihhihi')
        const userWantsToCancel = userData.user.id 
        await axios({
            method: 'PUT',
            url: `http://localhost:5000/users/rent/add/${userWantsToCancel}`, 
            data: {
                roomId: idOfRoom,
                date: convertedDate
            },
            headers: {
                'x-auth-token': authToken
            } 
        })
        .then(() => {

        })
        .catch(error => {
            console.log(error)
        })
    }


    const loadOption = () => {
        console.log(rentPlaces)
        // console.log('load option')
        let randomNum = Math.floor(Math.random()*5)   
        // console.log(rentPlaces)
        // const { description, price, title, images, userName, _id, capacity } = rentPlaces[randomNum]
        const { description, price, title, images, userName, _id, capacity } = rentPlaces[0]
        
        return (
            <div className="renter-option-div text-center" id={randomNum}>
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
                 {userHasBooked ? 
                 ( 
                    <>
                    <Button 
                        className="px-4" 
                        variant="warning" 
                        onClick={() => { 
                            cancelBooking(_id)
                            setUserHasBooked(false)
                        }}   
                    >Cancel Booking</Button>
                    <Button 
                        className="px-4" 
                        variant="dark" 
                        onClick={() => {
                            
                        }}
                    >Directions</Button>
                </>
                 
                 ) : (
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
                                    // setLoading(true)
                                }}
                            >rent</Button>
                        </>
                    )
                 }
                </div>
            </div>    
        )
        
    }
    
    let userBookedStyle;
        if (userHasBooked) {
            userBookedStyle = {
                backgroundColor: 'yellow'
            }
        }
    
    // if (loading === false) {
        if (rentPlaces.length > 0) {
            renterOption = loadOption()
        } else {
            renterOption = <div>no matches</div>
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