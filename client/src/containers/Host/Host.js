import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col' 


const Host = () => {

    const images = [
        'https://placeimg.com/400/280/arch',
        'https://placeimg.com/400/280/tech',
        'https://placeimg.com/400/280/people'
    ]





    return (
        <div className='host-container bg-light mb-5'>
            <Form>
                <div className='host-images-container mb-5'>
                    {images.map((images, index) => {
                        if (index === 0) {
                            return <div className='main-image-container' key={index}><img id='main-image-src' alt={images} src={images} /></div>
                        } else {
                            return <div className='small-image-container m-2' key={index} >
                                <img 
                                    id={`image` + index}
                                    alt={images} 
                                    src={images} 
                                    onClick={(e) => {
                                        
                                        const mainImage = {
                                            alt: document.getElementById('main-image-src').getAttribute('alt'),
                                            src: document.getElementById('main-image-src').getAttribute('src'),
                                        }
                                        // console.log(mainImage)
                                        document.getElementById('main-image-src').setAttribute('src', `${e.target.src}`)
                                        document.getElementById('main-image-src').setAttribute('alt', `${e.target.alt}`)

                                        document.getElementById(`${e.target.id}`).setAttribute('src', mainImage.src)
                                        document.getElementById(`${e.target.id}`).setAttribute('alt', mainImage.art)
                                        
                                        
                                    
                                    
                                    }}/></div>
                        }
                    })}
                <div className="mt-3 border justify-content-around d-inline-flex">
                    <Form.File id="formcheck-api-regular" className="d-inline-flex">
                    <Form.File.Input />
                    <Button className="btn btn-sm btn-dark pr-3 pl-3">Upload</Button>
                    </Form.File>
                </div>
                </div>  
                <br /><br /><hr />
                    <Form.Group controlId="formGridAddress1" className='mt-3'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Button className="bg-dark pr-4 pl-4" variant="primary" type="submit">Host</Button>
                
            </Form>
            
        </div>
        
    )
}

export default Host