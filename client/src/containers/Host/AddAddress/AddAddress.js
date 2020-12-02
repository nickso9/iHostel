import React, { useContext } from 'react';
import HostContext from '../../../contexts/HostContext'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col' 



const AddAddress = (props) => {
 
    const { host, setHost } = useContext(HostContext)
    const updater = (event) => {
        setHost(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [event.target.name]: event.target.value
                }
            }   
        ))  
    }
    

    return (  
        <>
            <hr />
            <Form.Group controlId="formGridAddress1" >
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    placeholder="1234 Main St" 
                    name="addressOne"
                    disabled={props.OnOrOff || false}
                    onChange={ele => {
                        updater(ele)
                    }}
                    value={!host.address.addressOne ? '' : host.address.addressOne}
                />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                    disabled={props.OnOrOff || false} 
                    placeholder="Apartment, studio, or floor" 
                    name="addressTwo"
                    onChange={ele => {
                        updater(ele)
                    }}
                    value={!host.address.addressTwo ? '' : host.address.addressTwo}
                />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control 
                    disabled={props.OnOrOff || false}
                    name="city"
                    onChange={ele => {
                        updater(ele)
                    }}
                    value={!host.address.city ? '' : host.address.city}
                />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control 
                    disabled={props.OnOrOff || false}
                    as="select" 
                    defaultValue={!host.address.state ? "Choose..." : host.address.state}
                    name="state"
                    onChange={ele => {
                        updater(ele)
                    }}      
                >
                    <option value="choose">Choose...</option>
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
                <Form.Control 
                    disabled={props.OnOrOff || false}
                    name="zip"
                    onChange={ele => {
                        updater(ele)
                    }}
                    value={!host.address.zip ? '' : host.address.zip}
                />
                </Form.Group>
            </Form.Row>

            </>

    )
}

export default AddAddress