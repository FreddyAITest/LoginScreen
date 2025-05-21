import React, { useState } from "react";

export default function Dashboard({ username, role, onLogout }) {
  const [page, setPage] = useState("home");
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="min-h-screen bg-green-100">
      {/* Navbar */}
      <nav className="bg-white shadow flex items-center px-8 py-4 relative">
        {/* Zentrale Buttons */}
        <div className="flex gap-8 mx-auto">
          <button
            className={`font-semibold ${page === "home" ? "text-blue-700" : "text-gray-600"}`}
            onClick={() => setPage("home")}
          >
            Home
          </button>
          <button
            className={`font-semibold ${page === "faq" ? "text-blue-700" : "text-gray-600"}`}
            onClick={() => setPage("faq")}
          >
            FAQ
          </button>
          {/* Admin sieht "Skills" */}
          {role === "admin" && (
            <button
              className={`font-semibold ${page === "skills" ? "text-blue-700" : "text-gray-600"}`}
              onClick={() => setPage("skills")}
            >
              Skills
            </button>
          )}
          {/* Nutzer sieht "Profil" */}
          {role === "nutzer" && (
            <button
              className={`font-semibold ${page === "profil" ? "text-blue-700" : "text-gray-600"}`}
              onClick={() => setPage("profil")}
            >
              Profil
            </button>
          )}
          {/* Gast sieht "Testbereich" */}
          {role === "gast" && (
            <button
              className={`font-semibold ${page === "test" ? "text-blue-700" : "text-gray-600"}`}
              onClick={() => setPage("test")}
            >
              Testbereich
            </button>
          )}
        </div>
        {/* Logout oben rechts */}
        <button
          className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition absolute right-8"
          onClick={onLogout}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          Logout ({roleLabel})
        </button>
      </nav>

      {/* Seiteninhalt */}
      <main className="flex justify-center items-start pt-16">
        <div className="bg-white p-10 rounded-2xl shadow-xl min-w-[400px] mt-10">
          {page === "home" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Willkommen im Dashboard!</h1>
              <p>
                Hier ist deine Startseite. Du kannst als <b>{roleLabel}</b> verschiedene Funktionen nutzen.
              </p>
            </>
          )}
          {page === "faq" && (
            <>
              <h1 className="text-2xl font-bold mb-4">FAQ</h1>
              <p>Hier könnten häufig gestellte Fragen stehen.</p>
            </>
          )}
          {page === "skills" && role === "admin" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Skills (Admin)</h1>
              <p>Nur der Admin sieht diesen Bereich.</p>
            </>
          )}
          {page === "profil" && role === "nutzer" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Mein Profil</h1>
              <p>Nur Nutzer sehen diesen Bereich.</p>
            </>
          )}
          {page === "test" && role === "gast" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Testbereich</h1>
              <p>Nur Gäste sehen diesen Bereich.</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
