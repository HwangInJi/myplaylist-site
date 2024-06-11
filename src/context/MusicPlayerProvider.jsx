import React, { createContext, useEffect, useState } from 'react'

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/data/music_list.json`);
            const data = await response.json();
            setMusicData(data);
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <MusicPlayerContext.Provider value={{ musicData }}>
            {children}
        </MusicPlayerContext.Provider>
    )
}

export default MusicPlayerProvider