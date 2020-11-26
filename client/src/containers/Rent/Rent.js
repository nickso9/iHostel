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
            console.log(userData.user.id)
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

    }, []);

    const userSaysNo = async (place, indexNum) => {
        // const userSaysNo = userData.user.id
        // const placeDenied = place

        // await axios.post(`http://localhost:5000/users/rent/${placeDenied}`, {userSaysNo})
        //     .then(response => console.log(response))
        //     .catch(error => console.log(error))

        // let convertedDate = format(new Date(), 'MMM d, yyyy')
        // console.log(convertedDate)
        // console.log('before ' + rentPlaces.length)
        let updatedArray = rentPlaces.filter((a, i) => indexNum !== i)
        console.log(updatedArray)
        await setRentPlaces(updatedArray)
        // console.log('after ' + rentPlaces.length)
    }

    const userSaysYes = () => {
        let convertedDate = format(new Date(), 'MMM d, yyyy')
        console.log(convertedDate)
    }

    
    const loadOption = () => {
        console.log(rentPlaces.length)
        let randomNum = Math.floor(Math.random()*rentPlaces.length)   
        const { description, price, title, images, userName, _id } = rentPlaces[randomNum]
        console.log(rentPlaces[randomNum])
        return (
            <div className="renter-option-div text-center" id={userName + randomNum}>
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
                        userSaysNo(_id, randomNum)
                        document.getElementById(userName + randomNum).remove()
                        
                    }}   
                >no</Button>
                <Button className="px-4" variant="success" onClick={userSaysYes}>rent</Button>
                </div>
            </div>    
        )
        
    }
    
    
    if (!loading) {
        renterOption = loadOption()
    } else {
        renterOption = <div>loading....</div>
    }
    
    return (
        
        <div className="rent-wrapper">
            {renterOption}     
        </div>
    )

}

export default Rent