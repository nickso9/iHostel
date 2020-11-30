import React from 'react'
import { Link } from 'react-router-dom'
import Backpack from '../../../assets/images/backpack.png'
import Cellphone from '../../../assets/images/cellphone.png'
import Sleeping from '../../../assets/images/Sleepinglogo.png'
// import Register from '../../../components/Auth/Register'

const Splash = () => {
    
    return (
        <>
        <div className="w-100 bg-light">
            {/* <div className="d-block w-100 mx-auto bg-light"><span><h1>What are you?</h1></span></div> */}
            <div className="d-flex justify-content-between flex-wrap container-fluid mt-5 splash-div py-5">
            <div className="text-center align-self-end"><img alt="backpack" src={Backpack} className="d-block"/><span className="mt-3"><h1>Trek</h1></span></div>
            <div className="text-center"><img alt="cellphone" src={Cellphone} className="d-block"/><span className="mt-3"><h1>Connect</h1></span></div>
            <div className="text-center align-self-end"><img alt="sleeping logo" src={Sleeping} className="d-block"/><span className="mt-3"><h1>Stay</h1></span></div>
            </div>

        </div>
        <div className="splash-div text-center mt-4 mx-auto">
            <div><h2>What are you?</h2></div>
            <div className="d-inline-flex justify-content-between flex-wrap w-50 mt-3">
            <div className="border-right border-dark w-50">
                <span><h4>Traveler</h4></span>
                <Link to={{
                    pathname: '/register',
                    state: { accountType: 'renter'}
                }} >
                    <button className="btn btn-outline-dark mt-4">Register as Guest</button>
                </Link>
            </div>
            <div className="w-50">
                <span><h4>Innkeeper</h4></span>
                <Link to={{
                    pathname: '/register',
                    state: { accountType: 'innkeeper'}
                }} >
                    <button className="btn btn-dark mt-4">Register as Innkeeper</button>
                </Link>
                </div>
            </div>
        </div>
        </>
    )

}

export default Splash