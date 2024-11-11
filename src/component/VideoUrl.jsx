import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { IoMdCloseCircleOutline } from 'react-icons/io';

const videosData = [
    {
        id: 1,
        title: "Cloudinary Video 1",
        thumbnail: "https://res.cloudinary.com/your-cloud-name/image/upload/sample-thumbnail1.jpg",
        url: "https://res.cloudinary.com/dj2edy2rg/video/upload/v1731341221/wquwm1xejbwpzmvlyrnz.mp4"
    },
    {
        id: 2,
        title: "YouTube Video 1",
        thumbnail: "https://img.youtube.com/vi/YOUTUBE_VIDEO_ID1/hqdefault.jpg",
        url: "https://youtu.be/cW58C4G4yCg?si=8NfyNrY56aI0-DE0"
    }
];

const VideoGallery = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoProgress, setVideoProgress] = useState({ played: 0, duration: 0 }); // To store video progress and duration

    const openModal = (video) => {
        setCurrentVideo(video);
        setIsModalOpen(true);
        setIsPlaying(false); // Prevent autoplay
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideo(null);
        setIsPlaying(false);
    };

    const togglePlayPause = () => {
        setIsPlaying(prevState => !prevState); // Toggle between play and pause
    };

    const handleProgress = (progress) => {
        setVideoProgress(progress);
    };

    const handleDuration = (duration) => {
        setVideoProgress((prevState) => ({ ...prevState, duration }));
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return "0:00";  // Check if the time is valid
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Video Gallery</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {videosData.map((video) => (
                    <div key={video.id} className="relative">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            onClick={() => openModal(video)}
                            className="w-64 h-36 cursor-pointer rounded shadow-md"
                        />
                        <AiOutlinePlayCircle
                            size={50}
                            className="absolute inset-0 m-auto text-white opacity-80 cursor-pointer hover:opacity-100"
                            onClick={() => openModal(video)}
                        />
                    </div>
                ))}
            </div>

            {isModalOpen && currentVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-2xl text-gray-300 z-10"
                    >
                        <IoMdCloseCircleOutline />
                    </button>

                    {/* Background Video */}
                    <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center bg-gray-900 rounded-lg">
                        <ReactPlayer
                            url={currentVideo.url}
                            playing={isPlaying}
                            width="100%" // Adjusted width
                            height="100%" // Adjusted height
                            style={{ borderRadius: '8px' }}
                            onProgress={handleProgress}
                            onDuration={handleDuration}
                        />

                        {/* Play/Pause Button */}
                        <div 
                            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                            onClick={togglePlayPause}
                        >
                            {isPlaying ? (
                                <AiOutlinePauseCircle size={80} className="text-white" />
                            ) : (
                                <AiOutlinePlayCircle size={80} className="text-white" />
                            )}
                        </div>

                        {/* Video Duration and Current Time */}
                        {isPlaying && videoProgress.duration > 0 && (
                            <div className="absolute bottom-4 left-4 text-white z-10">
                                <span>{formatTime(videoProgress.played * videoProgress.duration)} / {formatTime(videoProgress.duration)}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoGallery;
