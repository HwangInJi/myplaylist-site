import React, { useState } from 'react'
import Chart from '../components/Chart'
import useFetchData from '../hook/useFetchData';
import { ClipLoader } from 'react-spinners';

const GeniePage = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const [selectedDate, setSelectedDate] = useState(yesterday);

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const { data, loading } = useFetchData(`https://raw.githubusercontent.com/webs9919/music-best/main/genie/genie100_${formattedDate}.json`);

    return (
        <>
            {loading ? (
                <div className='loading'>
                    <ClipLoader size={50} color={'#59cbff'} loading={loading} />
                </div>
            ) : (
                <Chart
                    title="🧞‍♂️ 지니 차트 top100"
                    musicList={data}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    minDate={new Date('2024-05-01')}
                    maxDate={yesterday}
                />
            )}
        </>
    );
}

export default GeniePage