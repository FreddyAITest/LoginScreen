import React from "react";

// Pie chart for completed/open tasks
export default function TaskGraph({ tasks, darkMode = false }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const donePercent = total ? (done / total) * 100 : 0;

  // SVG pie chart calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const doneArc = (donePercent / 100) * circumference;
  return (
    <div className="w-full flex flex-col items-center">      <div className="flex justify-between text-sm mb-2 w-full max-w-[240px]">
        <span className={`font-semibold ${darkMode ? "text-primary-400" : "text-primary-700"}`}>Erledigt: {done}</span>
        <span className={`font-semibold ${darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>Offen: {total - done}</span>
      </div>
      <div className="relative flex items-center justify-center mb-2">
        <svg width="100" height="100" viewBox="0 0 120 120" className="sm:w-[120px] sm:h-[120px]">
          {/* Background circle (grau für offene Aufgaben) */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={darkMode ? "#475569" : "#94a3b8"}
            strokeWidth="18"
            strokeDasharray={circumference}
            strokeDashoffset={0}
            style={{ transition: "stroke 0.3s" }}
          />
          {/* Done (primary color arc) overlays the gray, always present but with 0 width if 0% */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={darkMode ? "#3b82f6" : "#1d4ed8"}
            strokeWidth="18"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - doneArc}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s, stroke 0.3s" }}
          />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-dark-text-primary" : "text-light-text-primary"}`}>
            {donePercent.toFixed(0)}%
          </div>
          <div className={`text-xs ${darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>erledigt</div>
        </div>
      </div>      <div className="flex justify-between text-xs w-full max-w-[240px]">
        <span className={darkMode ? "text-primary-400" : "text-primary-600"}>{donePercent.toFixed(0)}% erledigt</span>
        <span className={darkMode ? "text-dark-text-secondary" : "text-light-text-secondary"}>{(100 - donePercent).toFixed(0)}% offen</span>
      </div>
    </div>
  );
}
