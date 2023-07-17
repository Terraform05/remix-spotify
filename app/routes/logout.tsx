// description: this page should clear all the tokens stored in localstorage and redirect to the login page
// app/routes/logout.tsx

export default function Logout() {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.location.href = "/";
  }
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>LOG OUT</h1>
    </div>
  );
}
