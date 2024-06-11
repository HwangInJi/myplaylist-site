import React, { useContext, useRef, useState, useEffect } from 'react';
import { IoMusicalNotes, IoPlaySkipForward, IoPlaySkipBack, IoPlay, IoPause, IoRepeat, IoShuffleOutline, IoVolumeMute, IoVolumeLow, IoVolumeMedium, IoVolumeHigh } from 'react-icons/io5';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import ReactPlayer from 'react-player';

const Aside = () => {
    const { musicData } = useContext(MusicPlayerContext);   // 노래 데이터
    const [currentIndex, setCurrentIndex] = useState(0);    // 현재 노래 정보(0)
    const [isPlaying, setIsPlaying] = useState(false);      // 현재 플레이 상태(시작/정지)
    const [played, setPlayed] = useState(0);                // 현재 노래 진행바
    const [duration, setDuration] = useState(0);            // 현재 노래 작동시간
    const [isShuffle, setIsShuffle] = useState(false);      // 랜덤 재생 상태
    const [isRepeat, setIsRepeat] = useState(false);        // 반복 재생 상태
    const [volume, setVolume] = useState(0.5);              // 볼륨 상태
    const playerRef = useRef(null);                         // 현재 노래 레퍼런스
    const currentTrackRef = useRef(null);                   // 현재 트랙 레퍼런스

    const currentTrack = musicData.length > 0 ? musicData[currentIndex] : null;

    // 현재 재생 중인 트랙으로 스크롤
    useEffect(() => {
        if (currentTrackRef.current) {
            currentTrackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentIndex]);

    // 노래 플레이 상태
    const playTrack = (index) => {
        setCurrentIndex(index);
        setIsPlaying(true);
        setPlayed(0);
    };

    // 노래 정지
    const pauseTrack = () => {
        setIsPlaying(false);
    };

    // 노래 작동 시간
    const handleDuration = (duration) => {
        setDuration(duration);
    };

    // 노래 진행 바 컨트롤
    const handleSeekChange = (e) => {
        const newPlayed = parseFloat(e.target.value);
        setPlayed(newPlayed);
        playerRef.current.seekTo(newPlayed);
    };

    // 노래 진행 상태 업데이트
    const handleProgress = (state) => {
        setPlayed(state.played);
    };

    // 랜덤 인덱스 생성
    const getRandomIndex = () => {
        return Math.floor(Math.random() * musicData.length);
    };

    // 노래 다음 곡
    const handleNext = () => {
        if (isShuffle) {
            setCurrentIndex(getRandomIndex());
        } else if (isRepeat) {
            setPlayed(0);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % musicData.length);
        }
        setPlayed(0);
    };

    // 노래 이전 곡
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + musicData.length) % musicData.length);
        setPlayed(0);
    };

    // 노래 끝났을 때 다음 곡으로
    const handleEnded = () => {
        handleNext();
    };

    // 노래 시간 포맷
    const formatTime = (seconds) => {
        if (!seconds) return '00:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // 볼륨 변경 핸들러
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    // 볼륨 아이콘 결정
    const renderVolumeIcon = () => {
        if (volume === 0) {
            return <IoVolumeMute />;
        } else if (volume > 0 && volume <= 0.33) {
            return <IoVolumeLow />;
        } else if (volume > 0.33 && volume <= 0.66) {
            return <IoVolumeMedium />;
        } else {
            return <IoVolumeHigh />;
        }
    };

    return (
        <aside id='aside'>
            <div className='play-now'>
                <h2><IoMusicalNotes /> Now Playing</h2>
                <div className='thumb'>
                    <div className='img'>
                        {currentTrack && (
                            <ReactPlayer
                                ref={playerRef}
                                url={`https://www.youtube.com/watch?v=${currentTrack.videoID}`}
                                playing={isPlaying}
                                controls={false}
                                width="100%"
                                height="100%"
                                volume={volume}
                                onDuration={handleDuration}
                                onProgress={handleProgress}
                                onEnded={handleEnded}
                            />
                        )}
                    </div>
                    <span className='title'>{currentTrack?.title || '선택된 노래가 없습니다.'}</span>
                    <span className='artist'>{currentTrack?.artist || '선택된 노래가 없습니다.'}</span>
                </div>
                <div className='progress'>
                    <div className='progress-bar'>
                        <input
                            type='range'
                            min='0'
                            max='1'
                            step='0.01'
                            value={played}
                            onChange={handleSeekChange}
                        />
                    </div>
                    <div className='times'>
                        <span className='current'>{formatTime(played * duration)}</span>
                        <span className='total'>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className='controls'>
                    <span className={`shuffle ${isShuffle ? 'active' : ''}`} onClick={() => setIsShuffle(!isShuffle)}><IoShuffleOutline /></span>
                    <span className='prev' onClick={handlePrev}><IoPlaySkipBack /></span>
                    {isPlaying ? (
                        <span className='play bg' onClick={pauseTrack}><IoPause /></span>
                    ) : (
                        <span className='play bg' onClick={() => setIsPlaying(true)}><IoPlay /></span>
                    )}
                    <span className='next' onClick={handleNext}><IoPlaySkipForward /></span>
                    <span className={`repeat ${isRepeat ? 'active' : ''}`} onClick={() => setIsRepeat(!isRepeat)}><IoRepeat /></span>
                </div>
                <div className='volume'>
                    {renderVolumeIcon()}
                    <input type='range' min='0' max='1' step='0.01' value={volume} onChange={handleVolumeChange} />
                </div>
            </div>
            <div className='play-list'>
                <h3><IoMusicalNotes /> Play list</h3>
                <ul>
                    {musicData.map((track, index) => (
                        <li
                            key={index}
                            onClick={() => playTrack(index)}
                            className={index === currentIndex ? 'current-track' : ''}
                            ref={index === currentIndex ? currentTrackRef : null}
                        >
                            <span className='img' style={{ backgroundImage: `url(${track.imageURL})` }}></span>
                            <span className='title'>{track.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Aside;
