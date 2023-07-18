
import { useEffect, useState } from "react";
import { SectionCard } from "~/customContent/SectionCard";

const YourTopMusicCallouts = [
  {
    description: "Spice it up. Try something new.",
    title: "New Song",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
  {
    description: "Hey, I'm new here. Give me a listen.",
    title: "New Artist",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    href: "#",
  },
  {
    description: "Woah, what's this? I like it.",
    title: "New Genre",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    href: "#",
  },
  {
    description: "You might like this. Give it a try.",
    title: "Recommended",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
];

interface TopSongsResponse {
  user: {
    name: string;
    email: string;
    image: {
      url: string;
      height: number;
      width: number;
    };
    spotify_profile_url: string;
  };
}

export function ChooseSong() {
  const [topSongs, setTopSongs] = useState<TopSongsResponse | null>(null);

  useEffect(() => {
    const storedCode = window.localStorage.getItem("code");
    const storedCodeVerifier = window.localStorage.getItem("code_verifier");
    const storedAccessToken = window.localStorage.getItem("access_token");
    const storedRefreshToken = window.localStorage.getItem("refresh_token");
    const storedTokenTime = window.localStorage.getItem("token_time");

    // Fetch profile information
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile information");
        }

        const data = await response.json();
        
        console.log(data);

        setTopSongs(data);
      } catch (error) {
        console.error("Error fetching profile information:", error);
      }
    };

    if (storedAccessToken) {
      fetchProfileInfo();
    }
  }, []);

  return (
    <>
      <SectionCard>
        <h2 className="text-2xl font-bold text-gray-100 text-center my-2 sm:my-4 md:my-5 lg:my-6">
          Start With A Song You Know
        </h2>
        <div className="my-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-y-0">
          {YourTopMusicCallouts.map((YourTopMusicCallouts) => (
            <div
              key={YourTopMusicCallouts.description}
              className="group relative"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={YourTopMusicCallouts.imageSrc}
                  alt={YourTopMusicCallouts.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6">
                <a href={YourTopMusicCallouts.href}>
                  <p className="text-base font-semibold text-gray-100 mr-2">
                    {YourTopMusicCallouts.title}
                  </p>
                  <p className="text-sm text-gray-300">
                    {YourTopMusicCallouts.description}
                  </p>
                </a>
              </h3>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
