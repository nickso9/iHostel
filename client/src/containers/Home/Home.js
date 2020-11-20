import React from 'react'
import Carousels from './Carousels/Carousels'
import SearchBar from './Search/Search'

const Home = () => {
    return (
        <div className='container'>
            <SearchBar />
            <Carousels />

        </div>
        
    )
}

export default Home