import React from 'react'
import Card from 'react-bootstrap/Card'
// import axios from 'axios'

const Home = () => {
    

    
    
    
    return (
        <>
        <div className="renter-home-card">
            <h3>Current Booking:</h3>
        <Card border="dark" className="w-100 mt-4">
            <Card.Header>Staying Date of Nov 30th...</Card.Header>
            <Card.Body>
            <Card.Title>Dark Card Title</Card.Title>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
            </Card.Text>
            </Card.Body>
        </Card>
        </div>
        </>
    )
}

export default Home