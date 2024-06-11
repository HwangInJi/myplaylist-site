import React from 'react'
import { Link } from 'react-router-dom'

import { MdFavorite } from "react-icons/md";
import { BsMusicPlayerFill } from "react-icons/bs";
import { FaRectangleList } from "react-icons/fa6";

const Header = () => {
    return (
        <header id='header' role='banner'>
            <h1 className='logo'>
                <Link to='/'>MUSIC CHART</Link>
            </h1>
            <h2>chart</h2>
            <ul>
                <li><Link to='/melon'><span className='icon'></span>멜론 차트</Link></li>
                <li><Link to='/bugs'><span className='icon'></span>벅스 차트</Link></li>
                <li><Link to='/apple'><span className='icon'></span>애플 차트</Link></li>
                <li><Link to='/genie'><span className='icon'></span>지니 차트</Link></li>
                <li><Link to='/bill'><span className='icon'></span>빌보드 차트</Link></li>
            </ul>
            <h2>playlist</h2>
            <ul>
                <li><Link to='/recent'><FaRectangleList /> Recent</Link></li>
                <li><Link to='/favorite'><MdFavorite /> Favorite</Link></li>
                <li><Link to='/mymusic'><BsMusicPlayerFill /> My Music</Link></li>
            </ul>
        </header>
    )
}

export default Header