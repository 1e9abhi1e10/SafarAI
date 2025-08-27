
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from '../components/ui/card';
import { GoogleMap, LoadScript, MarkerF, PolylineF, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import axios from "axios";
import { MapContainer, TileLayer, Marker as LeafletMarker, Polyline as LeafletPolyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Keep libraries array stable to avoid reloading maps
const GOOGLE_LIBRARIES = ['geometry', 'drawing'];

// Minimal static coordinates as last-resort fallback when geocoding is blocked
const STATIC_CITY_COORDS = {
  delhi: { lat: 28.6139, lng: 77.2090 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  goa: { lat: 15.2993, lng: 74.1240 },
  paris: { lat: 48.8566, lng: 2.3522 },
  london: { lat: 51.5074, lng: -0.1278 },
  tokyo: { lat: 35.6895, lng: 139.6917 },
  kyoto: { lat: 35.0116, lng: 135.7681 },
  seoul: { lat: 37.5665, lng: 126.9780 }
};

const svgIcon = encodeURIComponent(
  `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c-5.522 0-10 4.394-10 9.815 0 5.505 4.375 9.268 10 14.185 5.625-4.917 10-8.68 10-14.185 0-5.421-4.478-9.815-10-9.815zm0 18c-4.419 0-8-3.582-8-8s3.581-8 8-8c4.419 0 8 3.582 8 8s-3.581 8-8 8zm-3.61-7.202l2.831-1.402-2.902-2.475.898-.444 4.697 1.586 2.244-1.111c.592-.297 1.569-.217 1.791.231.035.071.051.152.051.239-.002.458-.46 1.078-.953 1.325l-2.244 1.111-1.586 4.698-.898.444-.209-3.808-2.832 1.401-.584 1.408-.628.31-.219-2.126-1.559-1.464.628-.311 1.474.388z"/></svg>`
);
const iconUrl = `data:image/svg+xml,${svgIcon}`;

const getCoordinates = async (place) => { 
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  // Try Google Geocoding if a key is configured
  if (apiKey) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results.length > 0) {
        const location = results[0].geometry.location;
        return {
          lat: location.lat,
          lng: location.lng,
        };
      }
    } catch (error) {
      // fall through to OSM
    }
  }

  // Next: Mapbox Geocoding API if token available
  if (mapboxToken) {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxToken}&limit=1`;
      const { data } = await axios.get(url);
      if (data && data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return { lat, lng };
      }
    } catch (err) {
      // fall through to backend proxy
    }
  }

  // Fallback to our backend proxy for OpenStreetMap Nominatim
  try {
    const base = import.meta.env.VITE_BASE_URL || 'http://localhost:9000/api';
    const url = `${base}/geocode?q=${encodeURIComponent(place)}`;
    const response = await axios.get(url, { headers: { 'Accept-Language': 'en' } });
    if (Array.isArray(response.data) && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
  } catch (err) {
    console.error('Geocoding failed for place:', place, err);
  }
  return null;
};




const TravelMap = ({ locations, center, zoom }) => {
  const googleKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleKey,
    libraries: GOOGLE_LIBRARIES,
  });
  if (!googleKey) {
    // Leaflet fallback (OpenStreetMap)
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {Number.isFinite(center?.lat) && Number.isFinite(center?.lng) ? (
          <MapContainer center={[center.lat, center.lng]} zoom={zoom} style={{ width: '100%', height: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {locations.length > 1 && (
              <LeafletPolyline positions={locations.filter(l => Number.isFinite(l?.lat) && Number.isFinite(l?.lng)).map(l => [l.lat, l.lng])} />
            )}
            {locations.filter(l => Number.isFinite(l?.lat) && Number.isFinite(l?.lng)).map((l, idx) => (
              <LeafletMarker key={idx} position={[l.lat, l.lng]} />
            ))}
          </MapContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">No valid coordinates available.</div>
        )}
      </div>
    );
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%',
      }}
      zoom={zoom}
      center={center}
    >
      {/* Add Polyline to connect the locations */}
      {locations.length > 1 && (
        <PolylineF
          path={locations.map((location) => ({
            lat: location.lat,
            lng: location.lng,
          }))}
          options={{
            strokeColor: "#000000", // Change this color as needed
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      )} 
      {/* Ensure markers are visible */}
      {locations.map((location, index) => (
      
        <MarkerF
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          label={location.label}
          icon={{
            url: iconUrl,
            scaledSize: new window.google.maps.Size(24, 24),
          }}
        >
          {location.active && (
            <InfoWindow>
              <div style={{ padding: '5px', color: '#FF0000' }}>
              </div>
            </InfoWindow>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

TravelMap.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  zoom: PropTypes.number.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};


export default function TravelPage() {
  const location = useLocation();
  const [itineraryData, setItineraryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mapsData, setMapsData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(15); // Adjust the initial zoom level

  useEffect(() => {
    const getItineraryData = async () => {
      const query = new URLSearchParams(location.search);
      const data = query.get('data');
      if (data) {
        let response = JSON.parse(decodeURIComponent(data));
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }
        setItineraryData(response);
        const coarseCenter = STATIC_CITY_COORDS[response.destinationCountry?.toLowerCase?.()] || { lat: 20.5937, lng: 78.9629 };
        // Seed with a coarse center so map can render even if geocoding fails
        setMapCenter(coarseCenter);

        const coordinatesPromises = response.itinerary.flatMap(dayPlan =>
          dayPlan.activities.map(activity => getCoordinates(activity.location))
        );
        const coordinates = await Promise.allSettled(coordinatesPromises);
        const validCoordinates = coordinates
          .filter(r => r.status === 'fulfilled' && r.value && Number.isFinite(r.value.lat) && Number.isFinite(r.value.lng))
          .map(r => r.value);
        setMapsData(validCoordinates);

        // If any valid coordinate was found, recentre
        if (validCoordinates.length > 0) {
          setMapCenter(validCoordinates[0]);
        }
      }
      setLoading(false);
    };
    getItineraryData();
  }, [location.search]);

  const { destinationCountry, budget, itinerary } = itineraryData;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Details Layout */}
      
<div className="w-3/6 p-4 overflow-y-auto">
  {itinerary ? (
    itinerary.map((dayPlan, dayIndex) => (
      <Card 
      key={dayIndex} 
      className="mb-10 p-4 shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">
              {destinationCountry.charAt(0).toUpperCase() +
                destinationCountry.slice(1)}{" "}
              - Day {dayPlan.day}
            </h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div>
                <CalendarIcon className="w-4 h-4 mr-1 inline" />
                {dayPlan.date}
              </div>
              <div>
                <DollarSignIcon className="w-4 h-4 mr-1 inline" />
                Budget: ${budget}
              </div>
            </div>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={async (e) => {
              e.preventDefault();

              // Function to handle search action
              const searchPlaces = async () => {
                const places = itinerary.flatMap(dayPlan =>
                  dayPlan.activities.map(activity => activity.location)
                );

                const coordinatesPromises = places.map(place => getCoordinates(place));
                const coordinates = await Promise.all(coordinatesPromises);

                const locationsWithMarkers = coordinates.map((coord, index) => ({
                  ...coord,
                  label: places[index] || `Place ${index + 1}`,
                }));

                setMapsData(locationsWithMarkers.filter(coord => coord !== null));

                if (locationsWithMarkers.length > 0) {
                  setMapCenter(locationsWithMarkers[0]);  
                  setMapZoom(15); 
                }
              };

              await searchPlaces();
            }}
          >
            <FlameIcon className="w-4 h-4" />
            Locate Place
          </Button>
        </div>

        <div className="grid gap-6">
          {dayPlan.activities && dayPlan.activities.length > 0 ? (
            dayPlan.activities.map((activity, activityIndex) => (
              <div key={activityIndex} className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold">{activity.activity}</div>
                    <div className="text-muted-foreground">
                      <ClockIcon className="w-4 h-4 mr-1 inline" />
                      {activity.time}
                      <span className="mx-2">•</span>
                      <DollarSignIcon className="w-4 h-4 mr-1 inline" />
                      {activity.cost}
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {activity.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No activities planned.</div>
          )}
        </div>
        <div className="mt-6">
          <h2 className="font-bold">Meals</h2>
          {dayPlan.meals && dayPlan.meals.length > 0 ? (
            dayPlan.meals.map((meal, mealIndex) => (
              <div key={mealIndex} className="flex items-start gap-4 mt-4">
                <div className="flex-1">
                  <div className="font-bold">{meal.mealType}</div>
                  <div className="text-muted-foreground">
                    {meal.restaurant} - {meal.cuisine}
                  </div>
                  <div className="text-muted-foreground">{meal.price}</div>
                </div>
              </div>
            ))
          ) : (
            <div>No meals planned.</div>
          )}
        </div>
      </Card>
    ))
  ) : (
    <div>No itinerary data available.</div>
  )}
</div>

      {/* Map Layout */}
      <div className="w-3/6">
        <TravelMap
          locations={mapsData}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
    </div>
  );
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function CarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}


function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}


function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}