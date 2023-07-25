import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { SectionCard } from "~/customContent/SectionCard";

interface Playlist {
  collaborative: boolean;
  description: string | null;
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
  owner: {
    display_name: string | null;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  public: boolean | null;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export function ChoosePlaylist() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(15);

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    const storedAccessToken = window.localStorage.getItem("access_token");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    const storedTokenTime = window.localStorage.getItem("token_time");
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/playlists?limit=${selectedValue}`,
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const data = await response.json();

        console.log(data);

        setPlaylists(data.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    if (storedAccessToken) {
      fetchPlaylists();
    }
  }, [selectedValue]);

  const handleArtistClick = (playlistId: string) => {
    if (selectedPlaylists.includes(playlistId)) {
      setSelectedPlaylists((prevSelected) =>
        prevSelected.filter(
          (selectedPlaylist) => selectedPlaylist !== playlistId
        )
      );
    } else {
      setSelectedPlaylists((prevSelected) => [...prevSelected, playlistId]);
    }
  };

  const handleSliderValueChange = (value: number) => {
    setSelectedValue(value);
  };

  return (
    <>
      <SectionCard
        id="playlists"
        title="Choose a Playlist"
        selectedValue={selectedValue}
        onSliderValueChange={handleSliderValueChange}
      >
        {/* DISPLAYING SELECTED FOR TESTING */}
        <ul>
          {selectedPlaylists.map((playlistId) => (
            <li key={playlistId}>
              <p className="text-xs text-gray-100">ID: {playlistId}</p>
            </li>
          ))}
        </ul>
        {/* DISPLAYING SELECTED FOR TESTING */}

        <div className="my-6 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-y-0 cursor-pointer">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={`group relative ${
                selectedPlaylists.includes(playlist.id) ? "opacity-25" : ""
              }`}
              onClick={() => handleArtistClick(playlist.id)}
            >
              <div className="group relative">
                <div className="relative sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-50 ">
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
                  {/* Circle Check icon for selected songs */}
                  {selectedPlaylists.includes(playlist.id) && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <CheckCircleIcon className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="my-2">
                  <p className="text-xs font-semibold text-gray-100 mr-2">
                    {playlist.name}
                  </p>
                  <p className="text-xs text-gray-300">
                    {playlist.owner.display_name}
                  </p>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
