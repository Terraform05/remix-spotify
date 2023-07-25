import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { SectionCard } from "~/customContent/SectionCard";

interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export function ChooseArtist() {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(15);

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    const storedAccessToken = window.localStorage.getItem("access_token");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    const storedTokenTime = window.localStorage.getItem("token_time");
    const fetchTopArtists = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=${selectedValue}`,
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top artists");
        }

        const data = await response.json();

        console.log(data);

        setTopArtists(data.items);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    if (storedAccessToken) {
      fetchTopArtists();
    }
  }, [selectedValue]);

  const handleArtistClick = (artistId: string) => {
    if (selectedArtists.includes(artistId)) {
      setSelectedArtists((prevSelected) =>
        prevSelected.filter((selectedArtist) => selectedArtist !== artistId)
      );
    } else {
      setSelectedArtists((prevSelected) => [...prevSelected, artistId]);
    }
  };

  const handleSliderValueChange = (value: number) => {
    setSelectedValue(value);
  };

  return (
    <>
      <SectionCard
        id="artists"
        title="Start With An Artist You Know"
        selectedValue={selectedValue}
        onSliderValueChange={handleSliderValueChange}
      >
        {/* DISPLAYING SELECTED FOR TESTING */}
        <ul>
          {selectedArtists.map((artistId) => (
            <li key={artistId}>
              <p className="text-xs text-gray-100">ID: {artistId}</p>
            </li>
          ))}
        </ul>
        {/* DISPLAYING SELECTED FOR TESTING */}

        <div className="my-6 grid grid-cols-5 gap-x-8 space-y-0 cursor-pointer">
          {topArtists.map((artist) => (
            <div
              key={artist.id}
              className={`group relative ${
                selectedArtists.includes(artist.id) ? "opacity-25" : ""
              }`}
              onClick={() => handleArtistClick(artist.id)}
            >
              <div className="relative sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-50 ">
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="h-full w-full rounded-lg object-cover object-center"
                />
                {/* Circle Check icon for selected songs */}
                {selectedArtists.includes(artist.id) && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <CheckCircleIcon className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              <h3 className="my-2">
                <p className="text-xs font-semibold text-gray-100 mr-2">
                  {artist.name}
                </p>
                <p className="text-xs text-gray-300">
                  {/* You can display genres, popularity, etc. here if needed */}
                </p>
              </h3>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
