import { useCallback, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./MapDisplay.css";

mapboxgl.accessToken = `pk.eyJ1Ijoiam9zZXBoaGFydmlsbGU5NiIsImEiOiJjbTBiZnd1OHEwM2VlMnJvdGE4eDdhZWJjIn0.f5ixUJf5mXnHZzIl0rft6Q`;

export const MapDisplay = ({ userSearchedCity }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const fetchCityCoordinates = useCallback(async (userSearchedCity) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${userSearchedCity}&format=json&limit=1`
      );
      const data = await response.json();

      const coordinates =
        data.length > 0 ? [parseFloat(data[0].lon), parseFloat(data[0].lat)] : [0, 0];

      if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: coordinates,
          zoom: 7,
        });
      } else {
        mapRef.current.setCenter(coordinates);
      }
    } catch (error) {
      if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [0, 0],
          zoom: 1,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (userSearchedCity) {
      fetchCityCoordinates(userSearchedCity);
    }
  }, [userSearchedCity, fetchCityCoordinates]);

  return (
    <div ref={mapContainerRef} className="mapbox-component">
      {/* Mapbox will be rendered inside this div */}
    </div>
  );
};
