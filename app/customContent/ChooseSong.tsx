import { useEffect, useState, useRef, ReactNode } from "react";
import { SectionCard } from "~/customContent/SectionCard";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const CircularProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      className="rounded-full"
      style={{
        width: "50px",
        height: "50px",
        backgroundImage: `conic-gradient(from 0deg, white 0% ${progress}%, transparent ${progress}% 100%)`,
        WebkitMask: `radial-gradient(circle at 50% 50%, transparent 55%, black 55%)`,
        mask: `radial-gradient(circle at 50% 50%, transparent 55%, black 55%)`,
      }}
    />
  );
};

interface Track {
  id: string;
  name: ReactNode;
  album: {
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  preview_url: string;
  available_markets: string[];
}

export function ChooseSong() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(15);

  useEffect(() => {
    // Listen for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Pause the audio when the component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        audioRef.current.removeEventListener("timeupdate", updateTime);
        setCurrentPlaybackTime(0);
      }
    };
  }, []);

  const handleVisibilityChange = () => {
    // Pause the audio when the page becomes hidden
    if (document.hidden && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.removeEventListener("timeupdate", updateTime);
      setCurrentPlaybackTime(0);
    }
  };

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    const storedAccessToken = window.localStorage.getItem("access_token");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    const storedTokenTime = window.localStorage.getItem("token_time");
    const fetchTopTracks = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=${selectedValue}`,
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top tracks");
        }

        const data = await response.json();

        console.log(data);

        setTopTracks(data.items);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    if (storedAccessToken) {
      fetchTopTracks();
    }
  }, [selectedValue]);

  let hoverTimeout: NodeJS.Timeout;

  const handleHover = (trackUrl: string) => {
    hoverTimeout = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = trackUrl;
        const trackId = topTracks.find(
          (track) => track.preview_url === trackUrl
        )?.id;
        if (trackId && !selectedSongs.includes(trackId)) {
          audioRef.current.play();
          setIsPlaying(true);
        }
        audioRef.current.addEventListener("timeupdate", updateTime);
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.removeEventListener("timeupdate", updateTime);
      setCurrentPlaybackTime(0);
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentPlaybackTime(audioRef.current.currentTime);
    }
  };

  const songPercentage = isPlaying
    ? (currentPlaybackTime / (audioRef.current?.duration || 1)) * 100
    : 0;

  const handleSongClick = (trackId: string) => {
    if (selectedSongs.includes(trackId)) {
      setSelectedSongs((prevSelected) =>
        prevSelected.filter((selectedTrack) => selectedTrack !== trackId)
      );
    } else {
      setSelectedSongs((prevSelected) => [...prevSelected, trackId]);
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        audioRef.current.removeEventListener("timeupdate", updateTime);
        setCurrentPlaybackTime(0);
      }
    }
  };

  const handleSliderValueChange = (value: number) => {
    setSelectedValue(value);
  };

  return (
    <div className="select-none">
      <SectionCard
        id="songs"
        title="Start With A Song You Know"
        selectedValue={selectedValue}
        onSliderValueChange={handleSliderValueChange}
      >
        {/* DISPLAYING SELECTED FOR TESTING */}
        <ul>
          {selectedSongs.map((trackId) => (
            <li key={trackId}>
              <p className="text-xs text-gray-100">ID: {trackId}</p>
            </li>
          ))}
        </ul>
        {/* DISPLAYING SELECTED FOR TESTING */}

        <div className="my-6 grid grid-cols-5 gap-x-8 space-y-0 cursor-pointer">
          {topTracks.map((track) => (
            <div
              key={track.album.id}
              className={`group relative ${
                selectedSongs.includes(track.id) ? "opacity-25" : ""
              }`}
              onMouseEnter={() => handleHover(track.preview_url)}
              onMouseLeave={() => handleMouseLeave()}
              onClick={() => handleSongClick(track.id)}
            >
              <div className="relative sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1">
                <img
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  className="h-full w-full rounded-lg object-cover object-center group-hover:opacity-50"
                />
                {/* Circular progress bar (pie chart) */}
                {audioRef.current &&
                  audioRef.current.src === track.preview_url && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CircularProgressBar progress={songPercentage} />
                    </div>
                  )}
                {/* Circle Check icon for selected songs */}
                {selectedSongs.includes(track.id) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircleIcon className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              <h3 className="my-2">
                <p className="text-xs font-semibold text-gray-100 mr-2">
                  {track.name}
                </p>
                <p className="text-xs text-gray-300">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </h3>
            </div>
          ))}
        </div>
      </SectionCard>

      <audio ref={audioRef} controls preload="auto" style={{ display: "none" }}>
        {topTracks.map((track) => (
          <source
            key={track.album.id}
            src={track.preview_url}
            type="audio/mpeg"
          />
        ))}
      </audio>
    </div>
  );
}
