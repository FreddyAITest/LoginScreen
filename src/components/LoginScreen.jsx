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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-blue-50 to-primary-100 px-4 py-8">
      <form
        className="bg-light-bg p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-4"
        onSubmit={onLogin}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center text-primary-700">Task Manager</h2>
        <input
          className="border border-light-border p-2 rounded-xl focus:ring-2 focus:ring-primary-400 outline-none"
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border border-light-border p-2 rounded-xl focus:ring-2 focus:ring-primary-400 outline-none"
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          className="bg-primary-600 text-white rounded-xl p-3 mt-2 hover:bg-primary-700 transition-colors duration-300"
          type="submit"
        >
          Einloggen
        </button>
      </form>
    </div>
  );
}
