import React, { useState } from "react";
import TaskGraph from "./TaskGraph";

export default function Dashboard({ username, role, onLogout }) {
  const [page, setPage] = useState("home");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Beispielaufgabe 1", done: false },
    { id: 2, text: "Beispielaufgabe 2", done: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (    <div className={
      `min-h-screen flex flex-col transition-colors duration-300 ` +
      (darkMode
        ? "bg-gradient-to-br from-dark-bg via-dark-surface to-slate-900 text-dark-text-primary"
        : "bg-gradient-to-br from-primary-50 via-blue-50 to-primary-100 text-light-text-primary")
    }>      {/* Navbar */}      <nav className={
        `shadow flex flex-wrap items-center justify-between px-4 sm:px-8 py-4 relative z-10 border-b transition-colors duration-300 ` +
        (darkMode ? "bg-dark-surface border-dark-border" : "bg-light-bg border-light-border")
      }>
        {/* Mobiles Menü & Logo */}
        <div className="flex items-center">
          <h1 className={`text-lg font-bold ${darkMode ? "text-primary-400" : "text-primary-700"}`}>TaskBoard</h1>
        </div>

        {/* Zentrale Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-8 mx-auto text-sm sm:text-base order-3 w-full sm:w-auto sm:order-2 mt-3 sm:mt-0">          <button
            className={`font-semibold transition-colors duration-300 ${page === "home" ? (darkMode ? "text-primary-400" : "text-primary-700") : (darkMode ? "text-dark-text-secondary" : "text-light-text-secondary")}`}
            onClick={() => setPage("home")}
          >
            Home
          </button>
          <button
            className={`font-semibold transition-colors duration-300 ${page === "faq" ? (darkMode ? "text-primary-400" : "text-primary-700") : (darkMode ? "text-dark-text-secondary" : "text-light-text-secondary")}`}
            onClick={() => setPage("faq")}
          >
            FAQ
          </button>
          {/* Admin sieht "Skills" */}          {role === "admin" && (
            <button
              className={`font-semibold transition-colors duration-300 ${page === "skills" ? (darkMode ? "text-primary-400" : "text-primary-700") : (darkMode ? "text-dark-text-secondary" : "text-light-text-secondary")}`}
              onClick={() => setPage("skills")}
            >
              Skills
            </button>
          )}
          {/* Nutzer sieht "Profil" */}
          {role === "nutzer" && (
            <button
              className={`font-semibold transition-colors duration-300 ${page === "profil" ? (darkMode ? "text-primary-400" : "text-primary-700") : (darkMode ? "text-dark-text-secondary" : "text-light-text-secondary")}`}
              onClick={() => setPage("profil")}
            >
              Profil
            </button>
          )}
          {/* Gast sieht "Testbereich" */}
          {role === "gast" && (
            <button
              className={`font-semibold transition-colors duration-300 ${page === "test" ? (darkMode ? "text-primary-400" : "text-primary-700") : (darkMode ? "text-dark-text-secondary" : "text-light-text-secondary")}`}
              onClick={() => setPage("test")}
            >
              Testbereich
            </button>          )}</div>
        {/* Rechte Seite mit Dark Mode Toggle und Logout */}
        <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-3">          {/* Darkmode Toggle */}          <button
            className={
              `p-2 sm:p-3 rounded-xl transition-all duration-300 ` +
              (darkMode
                ? "bg-dark-elevated hover:bg-slate-600 hover:scale-105"
                : "bg-light-surface hover:bg-primary-100 hover:scale-105")
            }
            onClick={() => setDarkMode((d) => !d)}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? (
              // Sonne - Schlicht
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-400">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              // Mond - Schlicht
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-600">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </button>
          {/* Logout */}
          <button
            className={
              `px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base rounded-xl transition-all duration-300 ` +
              (darkMode
                ? "bg-red-600 text-dark-text-primary hover:bg-red-500 hover:scale-105"
                : "bg-red-500 text-white hover:bg-red-600 hover:scale-105")
            }
            onClick={onLogout}
          >
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Logout</span>
          </button>
        </div>
      </nav>      {/* Seiteninhalt */}
      <main className="flex-1 flex flex-col items-center justify-start w-full px-4 py-4 sm:px-6 sm:py-8 overflow-auto">
        <div className="w-full max-w-4xl">{page === "home" && (            <>              <h1 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${darkMode ? "text-primary-400" : "text-primary-700"}`}>Willkommen, {username}!</h1>
              <p className={`text-base sm:text-lg mb-4 sm:mb-8 ${darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
                Hier ist deine Startseite. Du kannst als <b>{roleLabel}</b> verschiedene Funktionen nutzen.
              </p>
              {/* Task Creation Section */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-8 items-start">                <div className={`p-4 sm:p-8 rounded-2xl shadow-xl w-full transition-colors duration-300 ${
                  darkMode 
                    ? "bg-dark-surface border border-dark-border" 
                    : "bg-light-bg"
                }`}>
                  <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${darkMode ? "text-primary-400" : "text-primary-700"}`}>Tägliche Aufgaben</h2>
                  <form
                    className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6"
                    onSubmit={e => {
                      e.preventDefault();
                      if (newTask.trim()) {
                        setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
                        setNewTask("");
                      }
                    }}
                  >
                    <input
                      className={`border p-2 rounded flex-1 focus:ring-2 transition-colors duration-300 ${
                        darkMode 
                          ? "border-dark-border bg-dark-elevated text-dark-text-primary focus:ring-primary-500 placeholder-dark-text-muted" 
                          : "border-light-border bg-light-bg text-light-text-primary focus:ring-primary-400 placeholder-light-text-muted"
                      }`}
                      type="text"
                      placeholder="Neue Aufgabe..."
                      value={newTask}
                      onChange={e => setNewTask(e.target.value)}
                    />
                    <button className={`mt-2 sm:mt-0 px-4 py-2 rounded transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? "bg-primary-600 text-white hover:bg-primary-500" 
                        : "bg-primary-600 text-white hover:bg-primary-700"
                    }`} type="submit">
                      Hinzufügen
                    </button>
                  </form><ul className={`mb-4 divide-y ${darkMode ? "divide-dark-border" : "divide-light-border"}`}>
                    {tasks.map(task => (
                      <li key={task.id} className="flex items-center gap-2 py-3">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
                          className={`w-5 h-5 ${darkMode ? "accent-primary-500" : "accent-primary-600"}`}
                        />
                        <span className={`flex-1 ${
                          task.done 
                            ? `line-through ${darkMode ? "text-dark-text-muted" : "text-light-text-muted"}` 
                            : `font-medium ${darkMode ? "text-dark-text-primary" : "text-light-text-primary"}`
                        }`}>{task.text}</span>
                        <button
                          className={`text-sm transition-colors duration-300 hover:underline ${
                            darkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600"
                          }`}
                          onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                        >
                          Löschen
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>                <div className={`p-4 sm:p-8 rounded-2xl shadow-xl w-full flex flex-col items-center transition-colors duration-300 ${
                  darkMode 
                    ? "bg-dark-surface border border-dark-border" 
                    : "bg-light-bg"
                }`}>
                  <h3 className={`font-semibold mb-4 ${darkMode ? "text-primary-400" : "text-primary-700"}`}>Aufgabenübersicht</h3>
                  <TaskGraph tasks={tasks} darkMode={darkMode} />
                </div>
              </div>
            </>
          )}          {page === "faq" && (
            <div className={`p-4 sm:p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
              darkMode 
                ? "bg-dark-surface border border-dark-border" 
                : "bg-light-bg"
            }`}>
              <h1 className={`text-xl sm:text-2xl font-bold mb-4 ${darkMode ? "text-primary-400" : "text-primary-700"}`}>FAQ</h1>
              <p className={darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"}>Hier könnten häufig gestellte Fragen stehen.</p>
            </div>
          )}
          {page === "skills" && role === "admin" && (
            <div className={`p-4 sm:p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
              darkMode 
                ? "bg-dark-surface border border-dark-border" 
                : "bg-light-bg"
            }`}>
              <h1 className={`text-xl sm:text-2xl font-bold mb-4 ${darkMode ? "text-primary-400" : "text-primary-700"}`}>Skills (Admin)</h1>
              <p className={darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"}>Nur der Admin sieht diesen Bereich.</p>
            </div>
          )}
          {page === "profil" && role === "nutzer" && (
            <div className={`p-4 sm:p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
              darkMode 
                ? "bg-dark-surface border border-dark-border" 
                : "bg-light-bg"
            }`}>
              <h1 className={`text-xl sm:text-2xl font-bold mb-4 ${darkMode ? "text-primary-400" : "text-primary-700"}`}>Mein Profil</h1>
              <p className={darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"}>Nur Nutzer sehen diesen Bereich.</p>
            </div>
          )}
          {page === "test" && role === "gast" && (
            <div className={`p-4 sm:p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
              darkMode 
                ? "bg-dark-surface border border-dark-border" 
                : "bg-light-bg"
            }`}>
              <h1 className={`text-xl sm:text-2xl font-bold mb-4 ${darkMode ? "text-primary-400" : "text-primary-700"}`}>Testbereich</h1>
              <p className={darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"}>Nur Gäste sehen diesen Bereich.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
