import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";


export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Alex' Spotify Remix App</h1>
      <Link to="/auth/login">login</Link>{" "}
      <Link to="/auth/logout">logout</Link>{" "}
      <Link to="/auth/refresh">refresh</Link>{" "}
    </div>
  );
}
