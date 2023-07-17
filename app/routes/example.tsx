import {
  Fragment,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MeResponse } from "~/response_type";

interface userProps {
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

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Recommended", href: "#", current: false },
  { name: "Songs", href: "#", current: false },
  { name: "Artists", href: "#", current: false },
  { name: "Playlists", href: "#", current: false },
  { name: "Genres", href: "#", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Log out", href: "/logout" },
];

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}

function Navigation({ user }: userProps) {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-black">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* DESKTOP MENU */}
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <a className="flex-shrink-0" href={user.spotify_profile_url} target="_blank" rel="noopener noreferrer">
                      <svg className="h-8 w-8" viewBox="0 0 168 168">
                        <path
                          fill="#1ED760"
                          d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
                        />
                      </svg>
                    </a>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-emerald-800 text-gray-100"
                                : "text-gray-300 hover:bg-emerald-800 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full p-1 text-gray-300 hover:text-white hover:bg-emerald-800 focus:text-white focus:bg-emerald-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <ExclamationCircleIcon
                          className="h-8 w-8"
                          aria-hidden="true"
                        />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3 ">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full py-1 pl-1 pr-3 text-gray-300 hover:text-white hover:bg-emerald-800 focus:text-white focus:bg-emerald-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.image ? user.image.url : ""}
                              alt=""
                            />
                            <div className="ml-3">
                              <div className="text-left text-base font-medium leading-none text-gray-300">
                                {user.name}
                              </div>
                              <div className="text-xs font-medium leading-none text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-emerald-800" : "",
                                      "block px-4 py-2 text-sm text-gray-300"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  {/* MOBILE MENU */}
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-emerald-800 p-2 text-gray-300 hover:bg-emerald-700 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-950">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-emerald-800 text-gray-100"
                          : "text-gray-300 hover:bg-emerald-800 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-black pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.image.url}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-gray-300">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full p-1 text-gray-300 hover:text-white hover:bg-emerald-800 focus:text-white focus:bg-emerald-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <ExclamationCircleIcon
                        className="h-7 w-7"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-emerald-800 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}

const callouts = [
  {
    description: "Pick one and start swiping.",
    title: "Song",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
  {
    description: "Pick one and start swiping.",
    title: "Artist",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    href: "#",
  },
  {
    description: "Pick one and start swiping.",
    title: "Playlist",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    href: "#",
  },
  {
    description: "Pick one and start swiping.",
    title: "Genre",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    href: "#",
  },
];

interface SectionCardProps {
  children: React.ReactNode;
}

function SectionCard({ children }: SectionCardProps) {
  return (
    <>
      <div className="mx-auto max-w-7xl py-6 justify-center items-center">
        <div className="relative isolate overflow-hidden bg-gray-800 px-6 shadow-2xl sm:rounded-3xl">
          {" "}
          {children}
        </div>
      </div>
    </>
  );
}

function ThreeColumnCards({ user }: userProps) {
  return (
    <>
      <SectionCard>
        <h2 className="text-2xl font-bold text-gray-100 text-center my-2 sm:my-4 md:my-5 lg:my-6">
          Welcome {user.name}!
        </h2>
        <div className="my-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-y-0">
          {callouts.map((callout) => (
            <div key={callout.description} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={callout.imageSrc}
                  alt={callout.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6">
                <a href={callout.href} className="flex items-center">
                  <p className="text-base font-semibold text-gray-100 mr-2">
                    {callout.title}
                  </p>
                  <p className="text-sm text-gray-300 mr-2">-</p>
                  <p className="text-sm text-gray-300">{callout.description}</p>
                </a>
              </h3>
            </div>
          ))}
        </div>
        {/* </div>*/}
      </SectionCard>
    </>
  );
}

const RecommendedTopMusicCallouts = [
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

function RecommendedTopMusic() {
  return (
    <>
      <SectionCard>
        <h2 className="text-2xl font-bold text-gray-100 text-center my-2 sm:my-4 md:my-5 lg:my-6">
          Top Recommended Music For You
        </h2>
        <div className="my-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-y-0">
          {RecommendedTopMusicCallouts.map((RecommendedTopMusicCallouts) => (
            <div
              key={RecommendedTopMusicCallouts.description}
              className="group relative"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={RecommendedTopMusicCallouts.imageSrc}
                  alt={RecommendedTopMusicCallouts.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6">
                <a href={RecommendedTopMusicCallouts.href}>
                  <p className="text-base font-semibold text-gray-100 mr-2">
                    {RecommendedTopMusicCallouts.title}
                  </p>
                  <p className="text-sm text-gray-300">
                    {RecommendedTopMusicCallouts.description}
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

function ChooseSong() {
  return (
    <>
      <SectionCard>
        <h2 className="text-2xl font-bold text-gray-100 text-center my-2 sm:my-4 md:my-5 lg:my-6">
          Start With A Song You Love
        </h2>
        <div className="my-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-y-0">
          {RecommendedTopMusicCallouts.map((RecommendedTopMusicCallouts) => (
            <div
              key={RecommendedTopMusicCallouts.description}
              className="group relative"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={RecommendedTopMusicCallouts.imageSrc}
                  alt={RecommendedTopMusicCallouts.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6">
                <a href={RecommendedTopMusicCallouts.href}>
                  <p className="text-base font-semibold text-gray-100 mr-2">
                    {RecommendedTopMusicCallouts.title}
                  </p>
                  <p className="text-sm text-gray-300">
                    {RecommendedTopMusicCallouts.description}
                  </p>
                </a>
              </h3>
            </div>
          ))}
        </div>
        {/* </div>*/}
      </SectionCard>
    </>
  );
}

export default function Example() {
  const [profileInfo, setProfileInfo] = useState<MeResponse | null>(null);

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
        setProfileInfo(data);
      } catch (error) {
        console.error("Error fetching profile information:", error);
      }
    };

    if (storedAccessToken) {
      fetchProfileInfo();
    }
  }, []);

  console.log(profileInfo);

  const user = {
    name: profileInfo?.display_name || "",
    email: profileInfo?.email || "",
    image: profileInfo?.images ? profileInfo.images[0] : "",
    spotify_profile_url: profileInfo?.external_urls
      ? profileInfo.external_urls.spotify
      : "",
  };

  return (
    <>
      <div className="bg-black">
        <Navigation user={user} />
        <ThreeColumnCards user={user} />
        <RecommendedTopMusic />
      </div>
    </>
  );
}
