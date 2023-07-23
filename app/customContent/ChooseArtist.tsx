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

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    const storedAccessToken = window.localStorage.getItem("access_token");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    const storedTokenTime = window.localStorage.getItem("token_time");
    const fetchTopArtists = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=15",
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
  }, []);

  return (
    <>
      <SectionCard id="artists">
        <h2 className="text-2xl font-bold text-gray-100 text-center my-2 sm:my-4 md:my-5 lg:my-6">
          Start With An Artist You Know
        </h2>
        <div className="my-6 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-y-0">
          {topArtists.map((artist) => (
            <a href={artist.external_urls.spotify} key={artist.id}>
              <div className="group relative">
                <div className="relative sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 ">
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
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
            </a>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
