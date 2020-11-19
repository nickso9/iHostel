import React from 'react'
import Carousel from 'react-bootstrap/Carousel'


const Carousels = () => {
    let picArray = [
        'https://placeimg.com/400/280/nature',
        'https://placeimg.com/400/280/people',
        'https://placeimg.com/400/280/animals',
        'https://placeimg.com/400/280/tech',
        'https://placeimg.com/400/280/arch'
    ]   



    return (
        <div id='carousel-wrapper'>
            <Carousel >
                {picArray.map((picture, index) => {
                    return (
                        <Carousel.Item interval={5000}>
                        <img
                        className="d-block w-100"
                        src={picture}
                        alt={index}
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    )
                })}        
            </Carousel>
        </div>
    )
}


export default Carousels