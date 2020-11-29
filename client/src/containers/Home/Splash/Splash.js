import React from 'react'
import Backpack from '../../../assets/images/backpack.png'
import Cellphone from '../../../assets/images/cellphone.png'
import Sleeping from '../../../assets/images/Sleepinglogo.png'

const Splash = () => {
    return (
        <div >
            <div className="d-block w-100 mx-auto bg-light"><span><h1>What are you?</h1></span></div>
            <div className="d-flex w-100 bg-light justify-content-between flex-wrap container-fluid">
            <div className="text-center align-self-end"><img alt="backpack" src={Backpack} className="d-block"/><button className="btn btn-outline-dark btn-lg mt-3">Guest</button></div>
            <div className="text-center"><img alt="cellphone" src={Cellphone} className="d-block"/><span><h1></h1></span></div>
            <div className="text-center align-self-end"><img alt="sleeping logo" src={Sleeping} className="d-block"/><button className="btn btn-outline-dark btn-lg mt-3">Innkeeper</button></div>
            </div>

        </div>
    )

}

export default Splash