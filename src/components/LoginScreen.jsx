import React from "react";

export default function LoginScreen({
  username,
  setUsername,
  password,
  setPassword,
  error,
  onLogin,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-4"
        onSubmit={onLogin}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <input
          className="border p-2 rounded-xl"
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded-xl"
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          className="bg-blue-600 text-white rounded-xl p-2 mt-2 hover:bg-blue-700 transition"
          type="submit"
        >
          Einloggen
        </button>
      </form>
    </div>
  );
}
