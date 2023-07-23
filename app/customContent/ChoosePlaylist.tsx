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

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    const storedAccessToken = window.localStorage.getItem("access_token");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    const storedTokenTime = window.localStorage.getItem("token_time");
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists?limit=15",
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
  }, []);

  return (
    <>
      <SectionCard id="playlists">
        <h2 className="text-2xl font-bold text-gray-100 text-center my-2 sm:my-4 md:my-5 lg:my-6">
          Choose a Playlist
        </h2>
        <div className="my-6 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-y-0">
          {playlists.map((playlist) => (
            <a href={playlist.external_urls.spotify} key={playlist.id}>
              <div className="group relative">
                <div className="relative sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 ">
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
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
            </a>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
