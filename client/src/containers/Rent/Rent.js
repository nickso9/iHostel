import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import UserContext from '../../contexts/UserContext'

const Rent = () => {

    // const { userData } = useContext(UserContext)
    const [rentPlaces, setRentPlaces] = useState(null)
    const [ loading, setLoading ] = useState(true)

    // console.log(userData.user.id)
    useEffect(() => {
        const searchLocation = () => {
            axios.get('http://localhost:5000/users/rent')
            .then(response => {
                setRentPlaces(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
        }

        searchLocation()

    }, []);

    let renterOption;
    if (!loading) {
        let randomNum = Math.floor(Math.random()*rentPlaces.length)   
        const { description, price, title, images, userName } = rentPlaces[randomNum]
        renterOption = (
            <div className="renter-option-div text-center">
                <div>{userName}</div>
                <div><h2>{title}</h2></div>
                <div>{price}</div>
                    {images.map((image, index) => {
                        return (
                            <img src={image} alt={title} key={index}/>
                        )
                    })}
                <div>{description}</div>
            </div>
        )
        

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