import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";

// Umgebungsvariable für den API-Key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
};

const defaultCenter = {
  lat: 52.520008, // Berlin als Standardposition
  lng: 13.404954,
};

const libraries = ["places"];

export default function MapComponent({ darkMode, fixedStartPoint, fixedEndPoint, compact = false }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Debug-Informationen
  useEffect(() => {
    console.log("Google Maps API Key:", GOOGLE_MAPS_API_KEY);
    console.log("Load Error:", loadError);
    if (loadError) {
      console.error("Google Maps Ladefehler:", loadError);
    }
  }, [loadError]);

  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const mapRef = useRef(null);
  
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Automatisch Route berechnen, wenn fixedStartPoint und fixedEndPoint verfügbar sind
  useEffect(() => {
    if (isLoaded && fixedStartPoint && fixedEndPoint) {
      calculateRoute();
    }
  }, [isLoaded, fixedStartPoint, fixedEndPoint]);
  const calculateRoute = () => {
    if (!fixedStartPoint || !fixedEndPoint) {
      console.log("Start- oder Endpunkt fehlt");
      return;
    }

    if (!window.google || !window.google.maps) {
      console.error("Google Maps API ist noch nicht geladen");
      return;
    }

    try {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: fixedStartPoint,
          destination: fixedEndPoint,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            
            // Entfernung und Dauer berechnen
            const route = result.routes[0];
            if (route && route.legs && route.legs.length > 0) {
              setDistance(route.legs[0].distance.text);
              setDuration(route.legs[0].duration.text);
            }
          } else {
            console.error(`Fehler beim Berechnen der Route: ${status}`);
          }
        }
      );
    } catch (error) {
      console.error("Fehler bei der Routenberechnung:", error);
    }
  };  const containerStyle = {
    width: '100%',
    height: '100%',
    minHeight: compact ? '300px' : '400px',
  };

  if (loadError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-600 font-medium mb-2">Google Maps konnte nicht geladen werden</h3>
        <p className="text-red-800 mb-2">Fehlermeldung: {loadError.message}</p>
        <ul className="list-disc pl-5 text-red-700 text-sm">
          <li>Überprüfe, ob der API-Schlüssel korrekt ist</li>
          <li>Stelle sicher, dass die Maps JavaScript API in der Google Cloud Console aktiviert ist</li>
          <li>Prüfe, ob du die Abrechnung für das Google Maps Platform aktiviert hast</li>
          <li>Kontrolliere die Domainbeschränkungen deines API-Schlüssels</li>
        </ul>
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-full p-4">Karte wird geladen...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {directions && (
        <div className={`mb-3 p-3 rounded-lg ${
          darkMode ? "bg-dark-elevated text-dark-text-primary" : "bg-light-surface text-light-text-primary"
        }`}>
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <div>
              <p className="text-sm font-medium">Von: {fixedStartPoint}</p>
              <p className="text-sm font-medium">Nach: {fixedEndPoint}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-medium">{distance}</p>
              <p className="font-medium">{duration}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 relative rounded-lg overflow-hidden border border-gray-300">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={10}
          onLoad={onMapLoad}
          options={{
            styles: darkMode ? [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
              { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
              { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
              { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
              { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
              { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
              { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
              { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
              { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
              { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
              { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
              { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
              { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
              { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
              { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
            ] : [],
          }}
        >          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
}
