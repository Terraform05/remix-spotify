import { useEffect, useState, useRef, ReactNode } from "react";
import { SectionCard } from "~/customContent/SectionCard";

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

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    const storedAccessToken = window.localStorage.getItem("access_token");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    const storedTokenTime = window.localStorage.getItem("token_time");
    const fetchTopTracks = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=15",
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
  }, []);

  const handleHover = (trackUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = trackUrl;
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.addEventListener("timeupdate", updateTime);
    }
  };

  const handleMouseLeave = () => {
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

  return (
    <>
      <SectionCard id="songs">
        <h2 className="text-2xl font-bold text-gray-100 text-center my-2 sm:my-4 md:my-5 lg:my-6">
          Start With A Song You Know
        </h2>
        <div className="my-6 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-y-0">
          {topTracks.map((track) => (
            <a href={track.album.external_urls.spotify}>
              <div
                key={track.album.id}
                className="group relative"
                onMouseEnter={() => handleHover(track.preview_url)}
                onMouseLeave={() => handleMouseLeave()}
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
                </div>

                <h3 className="my-2">
                  <p className="text-xs font-semibold text-gray-100 mr-2">
                    {track.name}
                  </p>
                  <p className="text-xs text-gray-300">
                    {track.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  </p>
                </h3>
              </div>
            </a>
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
    </>
  );
}
