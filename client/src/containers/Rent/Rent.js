import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { format } from 'date-fns'
import UserContext from '../../contexts/UserContext'


const Rent = () => {

    const { userData } = useContext(UserContext)
    const [rentPlaces, setRentPlaces] = useState(null)
    const [ loading, setLoading ] = useState(true)
    let renterOption;
    
    useEffect(() => {
        const searchLocation = () => {
            axios.get('http://localhost:5000/users/rent',
             { 
                 params: { 
                     user: userData.user.id
            }})
            .then(response => {
                setRentPlaces(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
        }
        searchLocation()
    }, [userData.user.id, loading]);

    const userSaysNo = async (place) => {
        console.log('user says no')
        const userSaysNo = userData.user.id
        await axios.post(`http://localhost:5000/users/rent/${place}`, {userSaysNo})
            .then(() => {
                
                setLoading(false)
                
                
            })
            .catch(error => console.log(error))
             
        // let convertedDate = format(new Date(), 'MMM d, yyyy')
        // console.log(convertedDate)
        
    }

    const userSaysYes = async (idOfRoom) => {
        const userSaysYes = userData.user.id
        const convertedDate = format(new Date(), 'MMM d, yyyy')
        await axios.post(`http://localhost:5000/users/rent/add/${userSaysYes}`, 
        { params: {
            roomId: idOfRoom,
            date: convertedDate
        }
        })
            .then(() => {

            })
            .catch(error => {
                console.log(error)
            })
    }

    

    const loadOption = () => {
        let randomNum = Math.floor(Math.random()*rentPlaces.length)   
        const { description, price, title, images, userName, _id } = rentPlaces[randomNum]
        return (
            <div className="renter-option-div text-center" id={userName+randomNum} >
                <div>{userName}</div>
                <div><h2>{title}</h2></div>
                <div>{price}</div>
                    {images.map((image, index) => {
                        return (
                            <img src={image} alt={title} key={index}/>
                        )
                    })}
                <div>{description}</div>
                <div className="d-flex justify-content-between my-3">
                <Button 
                    className="px-4" 
                    variant="danger" 
                    onClick={() => { 
                        setLoading(true)
                        userSaysNo(_id)   
                    }}   
                >no</Button>
                <Button 
                    className="px-4" 
                    variant="success" 
                    onClick={() => {
                        userSaysYes(_id)
                    }}
                >rent</Button>
                </div>
            </div>    
        )
        
    }
    
    
    if (!loading) {
        if (rentPlaces.length > 0) {
            renterOption = loadOption()
        } else {
            renterOption = <div>no matches</div>
        }
    } else {
        // renterOption = <div>loading....</div>
    }
    
    return (
        
        <div id="rent-wrapper">
            {renterOption}   
        </div>
    )

}

export default Rent