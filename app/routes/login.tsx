// description: User not logged in, show information and start login process. Redirect to spotify login and then to callback page.
// app/routes/login.tsx
import {
  generateRandomString,
  initiateAuthorization,
} from "../spotifyAuthPKCE";

export function spotify_login_redirect() {
  const code_verifier = generateRandomString(128);
  window.localStorage.setItem("code_verifier", code_verifier);

  console.log("code_verifier: ", code_verifier);

  initiateAuthorization(code_verifier).then((url) => {
    window.location.href = url;
  });
}

export default function Login() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-12 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left ">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              SwipeSpot.
              <br />
              Effortless playlists.
              <br />
              Made for you.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300 ">
              Jump right in and start swiping to create the perfect playlist
              full of the music you love.
              <br />
              <br />
              Connected directly to spotify.
              <br />
              No sign up required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                onClick={() => spotify_login_redirect()}
                className="cursor-pointer rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Login with Spotify
              </a>
              <a
                href="example#data_privacy"
                className="text-sm font-semibold leading-6 text-white"
              >
                Data Privacy <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left ">
            <svg
              className="object-cover h-auto w-auto p-10 "
              viewBox="0 0 168 168"
            >
              <path
                fill="#1ED760"
                d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-12 lg:px-8"
        id="data_privacy"
      >
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-lg text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left ">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your data is yours.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300 ">
              All spotify access is stored on your device.
              <br />
              We do not store any of your data. We leave that to Spotify.
              <br />
              When you close the app, we lose all account access.
              <br />
              <br />
              You're in control. It's as simple as that!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="cursor-pointer rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Login with Spotify
              </a>
              <a
                href="example#meet_the_creator"
                className="text-sm font-semibold leading-6 text-white"
              >
                Meet the Creator <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <img
              className="object-cover h-auto w-auto p-10 "
              src="https://uploads-ssl.webflow.com/612e545fdda38481883243da/6257fbaddf20abee520bfe6d_Data%20security.png"
              alt="data privacy image"
            />
          </div>
        </div>
      </div>

      <div
        className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-12 lg:px-8"
        id="meet_the_creator"
      >
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-lg text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left ">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Meet the creator.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300 ">
              Hi, I'm Terraform05.
              <br />
              <br />
              I'm a full stack developer, student, and I love music!
              <br />
              <br />
              I made this app to help me find new music and to learn more about
              the Remix-React 💿 framework.
              <br />
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="cursor-pointer rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                My Github
              </a>
              <a
                href="example"
                className="text-sm font-semibold leading-6 text-white"
              >
                SwipeSpot ReadMe <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <img
              className="object-cover h-auto w-auto p-10 rounded-full"
              src="https://avatars.githubusercontent.com/u/60861553?v=4"
              alt="Terraform05 Profile Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
