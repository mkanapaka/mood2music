"use client";
import React, { useState } from "react";

interface Mood {
  name: string;
  genre: string;
  icon: string;
}

function MainComponent(): JSX.Element {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  const moods: Mood[] = [
    { name: "Romantic", genre: "Jazz", icon: "fa-heart" },
    { name: "Adventurous", genre: "Rock", icon: "fa-mountain" },
    { name: "Happy", genre: "Pop", icon: "fa-smile" },
    { name: "Relaxed", genre: "Classical", icon: "fa-leaf" },
    { name: "Energetic", genre: "Electronic", icon: "fa-bolt" },
    { name: "Melancholic", genre: "Blues", icon: "fa-cloud-rain" },
    { name: "Nostalgic", genre: "Oldies", icon: "fa-clock" },
    { name: "Focused", genre: "Ambient", icon: "fa-bullseye" },
    { name: "Angry", genre: "Metal", icon: "fa-fire" },
    { name: "Peaceful", genre: "Nature Sounds", icon: "fa-tree" },
    { name: "Excited", genre: "Dance", icon: "fa-star" },
    { name: "Confident", genre: "Hip Hop", icon: "fa-crown" },
    { name: "Dreamy", genre: "Indie", icon: "fa-cloud" },
    { name: "Curious", genre: "World", icon: "fa-globe" },
    { name: "Determined", genre: "Motivational", icon: "fa-fist-raised" },
  ];

  const generateRandomSong = (genre: string): Promise<string | null> => {
    const searchQuery = encodeURIComponent(`${genre} music`);
    return fetch(`/api/youtube-search?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error('Error from API:', data.error);
          return null;
        }
        const videos = data.items;
        const randomIndex = Math.floor(Math.random() * videos.length);
        return videos[randomIndex].id.videoId;
      })
      .catch((error) => {
        console.error("Error fetching YouTube data:", error);
        return null;
      });
  };

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    const randomSongId = await generateRandomSong(mood.genre);
    setCurrentSong(randomSongId);
  };

  const handleRefresh = async () => {
    if (selectedMood) {
      const randomSongId = await generateRandomSong(selectedMood.genre);
      setCurrentSong(randomSongId);
    }
  };

  const handleHeaderClick = () => {
    setSelectedMood(null);
    setCurrentSong(null);
  };

return (
  <div className="min-h-screen bg-[#121212] font-roboto text-white">
    <header className="bg-[#1db954] shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <img src="/Mood2Musiclogo.png" alt="Mood2Music Logo" className="h-10 mr-4" />
        <h1
          className="text-3xl font-bold cursor-pointer hover:text-[#191414] transition-colors"
          onClick={handleHeaderClick}
        >
          Mood2Music
        </h1>
      </div>
    </header>

    <div className="container mx-auto px-4 py-8">
      <p className="text-4xl font-extrabold text-center mb-12 text-[#1db954]">
        Discover top rated songs based on your mood.
      </p>

      {!selectedMood ? (
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center">
            How are you feeling today?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => handleMoodSelect(mood)}
                className="bg-[#282828] p-6 rounded-lg shadow hover:shadow-lg transition-all transform hover:scale-105 hover:bg-[#333333]"
              >
                <i className={`fas ${mood.icon} text-5xl mb-3 text-[#1db954]`}></i>
                <p className="text-lg">{mood.name}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
      
          <h2 className="text-3xl font-semibold mb-6 text-center">
            {selectedMood.name} Mood - {selectedMood.genre} Song
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#282828] p-4 rounded-lg shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                {currentSong && (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentSong}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[600px] rounded-md"
                  ></iframe>
                )}
              </div>
              <button
                onClick={handleRefresh}
                className="w-full bg-[#1db954] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors font-bold"
              >
                Refresh Song
              </button>
            </div>
          </div>
          <button
            onClick={() => setSelectedMood(null)}
            className="mt-8 bg-[#1db954] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors font-bold mx-auto block"
          >
            Back to Moods
          </button>
        </div>
      )}
    </div>
    
    <footer className="mt-12 text-center text-sm text-gray-400">
      Made with <i className="fas fa-heart text-[#FF2400]"></i> by <a href="https://twitter.com/mkanapaka" target="_blank" rel="noopener noreferrer" className="text-[#1db954] hover:underline">MK</a>
    </footer>

    
    <style jsx global>{`
      @keyframes hoverEffect {
        0% {
          transform: translateY(0);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        100% {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }
      }
      button:hover {
        animation: hoverEffect 0.3s ease-in-out forwards;
      }
    `}</style>
  </div>

);
}

export default MainComponent;