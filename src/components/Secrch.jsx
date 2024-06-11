import React from 'react'
import { LuSearch } from 'react-icons/lu'

const Secrch = () => {
    return (
        <div className="search">
            <label htmlFor="searchInput"><LuSearch /></label>
            <input type="text" placeholder='Search' id='searchInput' />
        </div>
    )
}

export default Secrch