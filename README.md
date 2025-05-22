# Task Manager mit Routenplanung

Eine Webanwendung zur Verwaltung von Aufgaben und zur Routenplanung mit Google Maps Integration.

## Funktionen

- Anmeldung/Abmeldung
- Aufgabenverwaltung (Hinzufügen, Abschließen, Löschen)
- Visualisierung des Aufgabenfortschritts mit einem Kreisdiagramm
- Google Maps Routenplanung zwischen zwei Punkten
- Responsive Design für Desktop und Mobile
- Dunkler/Heller Modus

## Installation

1. Klone das Repository
2. Führe `npm install` aus
3. Erstelle eine `.env` Datei im Stammverzeichnis mit folgendem Inhalt:
   ```
   VITE_GOOGLE_MAPS_API_KEY=DEIN_API_KEY
   ```

## Google Maps API-Schlüssel einrichten

Um die Routenplanungsfunktion zu nutzen, benötigst du einen Google Maps API-Schlüssel:

1. Besuche die [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt (falls noch nicht vorhanden)
3. Aktiviere die folgenden APIs:
   - Maps JavaScript API
   - Directions API
   - Places API
4. Erstelle einen API-Schlüssel unter "Anmeldedaten"
5. Beschränke den API-Schlüssel auf die oben genannten APIs
6. Kopiere den Schlüssel in deine `.env` Datei

## Entwicklung starten

```
npm run dev
```

## Produktions-Build erstellen

```
npm run build
```
