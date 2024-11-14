import { useCallback, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./MapDisplay.css";

mapboxgl.accessToken = `pk.eyJ1Ijoiam9zZXBoaGFydmlsbGU5NiIsImEiOiJjbTBiZnd1OHEwM2VlMnJvdGE4eDdhZWJjIn0.f5ixUJf5mXnHZzIl0rft6Q`;

const defaultCoordinates = [-74.5, 40];

export const MapDisplay = ({ userSearchedCity, isLoadingDone }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const fetchCityCoordinates = useCallback(
    async (userSearchedCity) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${userSearchedCity}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length) {
          const { lon, lat } = data[0];
          const coordinates = [parseFloat(lon), parseFloat(lat)];
          if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
              container: mapContainerRef.current,
              style: "mapbox://styles/mapbox/streets-v11",
              center: defaultCoordinates,
              zoom: 7,
            });
          } else {
            mapRef.current.setCenter(coordinates);
          }
        } else {
          mapRef.current?.setCenter(defaultCoordinates);
        }
      } catch (error) {
        console.error("Error from MapDisplay fetching city coordinates:", error);
      } finally {
      }
    },
    [userSearchedCity]
  );

  useEffect(() => {
    if (userSearchedCity) {
      fetchCityCoordinates(userSearchedCity);
    }
  }, [userSearchedCity]);

  return (
    <div ref={mapContainerRef} className="mapbox-component">
      {/* Mapbox will be rendered inside this div */}
    </div>
  );
};
