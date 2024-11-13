import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "./MapDisplay.css";

mapboxgl.accessToken = `pk.eyJ1Ijoiam9zZXBoaGFydmlsbGU5NiIsImEiOiJjbTBiZnd1OHEwM2VlMnJvdGE4eDdhZWJjIn0.f5ixUJf5mXnHZzIl0rft6Q`;

const defaultCoordinates = [-74.5, 40];

export const MapDisplay = (isLoading) => {
  const [searchParams] = useSearchParams();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const cityName = searchParams.get("city");

  const fetchCityCoordinates = useCallback(
    async (cityName) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length) {
          const { lon, lat } = data[0];
          const coordinates = [parseFloat(lon), parseFloat(lat)];
          if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
              container: mapContainerRef.current,
              style: "mapbox://styles/mapbox/streets-v11",
              center: defaultCoordinates, // Default coordinates
              zoom: 7,
            });
          } else {
            mapRef.current.setCenter(coordinates);
          }
          return;
        }
        mapRef.current?.setCenter(defaultCoordinates);
      } catch (error) {
        console.error("Error fetching city coordinates:", error);
      }
    },
    [mapContainerRef, mapRef, cityName]
  );

  useEffect(() => {
    if (cityName) {
      fetchCityCoordinates(cityName);
    }
  }, [searchParams, cityName, fetchCityCoordinates]);

  return (
    <div ref={mapContainerRef} className="mapbox-component">
      {/* Mapbox will be rendered inside this div */}
    </div>
  );
};
