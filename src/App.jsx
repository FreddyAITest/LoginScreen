import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import { USERS } from "./data/users";


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setLoggedIn(true);
      setRole(found.role);
      setError("");
    } else {
      setError("Falscher Benutzername oder Passwort!");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
    setRole("");
  };

  return (
    <>
      {!loggedIn ? (
        <LoginScreen
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          error={error}
          onLogin={handleLogin}
        />
      ) : (
        <Dashboard username={username} role={role} onLogout={handleLogout} />
      )}
    </>
  );
}
