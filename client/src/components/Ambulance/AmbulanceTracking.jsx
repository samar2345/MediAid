import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaAmbulance, FaPhoneAlt, FaRoute } from 'react-icons/fa';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom ambulance icon
const ambulanceIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991303.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// MapController component to handle map interactions
function MapController({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  
  return null;
}

// Hardcoded ambulance data
const initialAmbulances = [
  {
    id: 1,
    position: [22.5726, 88.3639], // Kolkata
    name: "Emergency Responder A1",
    status: "Available",
    phone: "123-456-7890",
    eta: "5 minutes"
  },
  {
    id: 2,
    position: [22.5616, 88.3875], // Near Science City
    name: "Emergency Responder B2",
    status: "On Route",
    phone: "123-456-7891",
    eta: "10 minutes"
  },
  {
    id: 3,
    position: [22.5958, 88.3476], // North Kolkata
    name: "Emergency Responder C3",
    status: "Available",
    phone: "123-456-7892",
    eta: "8 minutes"
  },
  {
    id: 4,
    position: [22.5149, 88.3920], // South Kolkata
    name: "Emergency Responder D4",
    status: "On Standby",
    phone: "123-456-7893",
    eta: "12 minutes"
  },
  {
    id: 5,
    position: [22.5921, 88.4101], // Salt Lake 
    name: "Emergency Responder E5",
    status: "Available",
    phone: "123-456-7894",
    eta: "4 minutes"
  },
  {
    id: 6,
    position: [22.4856, 88.4238], // New Town
    name: "Emergency Responder F6",
    status: "On Route",
    phone: "123-456-7895",
    eta: "15 minutes"
  },
  {
    id: 7,
    position: [22.5698, 88.4214], // Sector 5
    name: "Emergency Responder G7",
    status: "Available",
    phone: "123-456-7896",
    eta: "3 minutes"
  }
];

const AmbulanceTracking = () => {
  const [ambulances, setAmbulances] = useState(initialAmbulances);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Kolkata center
  const [userLocation, setUserLocation] = useState(null);

  // Simulate ambulance movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setAmbulances(prev => prev.map(ambulance => ({
        ...ambulance,
        position: [
          ambulance.position[0] + (Math.random() * 0.002 - 0.001),
          ambulance.position[1] + (Math.random() * 0.002 - 0.001)
        ],
        eta: Math.floor(Math.random() * 15) + 1 + " minutes"
      })));
    }, 5000);

    return () => clearInterval(moveInterval);
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Find nearest ambulance
  const findNearestAmbulance = () => {
    if (!userLocation) return null;
    
    let nearestAmbulance = null;
    let shortestDistance = Infinity;
    
    ambulances.forEach(ambulance => {
      const distance = L.latLng(userLocation).distanceTo(L.latLng(ambulance.position));
      if (distance < shortestDistance && ambulance.status === "Available") {
        shortestDistance = distance;
        nearestAmbulance = ambulance;
      }
    });
    
    return nearestAmbulance;
  };

  const nearestAmbulance = findNearestAmbulance();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <FaAmbulance className="inline-block mr-2 text-red-500" />
            Live Ambulance Tracking
          </h1>
          <p className="mt-3 text-xl text-gray-800 sm:mt-4">
            Find emergency ambulances near your location
          </p>
        </div>

        {/* Info Panel */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3">Available Ambulances</h2>
            <div className="text-3xl font-bold text-green-500">
              {ambulances.filter(a => a.status === "Available").length}
            </div>
            <p className="text-gray-500">Ready to respond</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3">Ambulances On Route</h2>
            <div className="text-3xl font-bold text-yellow-500">
              {ambulances.filter(a => a.status === "On Route").length}
            </div>
            <p className="text-gray-500">Currently on emergency calls</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-3">Your Location</h2>
            {userLocation ? (
              <div>
                <p className="font-medium">Location accessed</p>
                <p className="text-gray-500">Showing nearest ambulances</p>
              </div>
            ) : (
              <div className="text-yellow-500">
                Unable to get your location
              </div>
            )}
          </div>
        </div>

        {/* Nearest Ambulance Alert */}
        {nearestAmbulance && (
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaAmbulance className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Nearest Available Ambulance: {nearestAmbulance.name}
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>ETA: {nearestAmbulance.eta}</p>
                  <button 
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaPhoneAlt className="-ml-1 mr-2 h-4 w-4" />
                    Call {nearestAmbulance.phone}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-[600px] w-full">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <MapController center={mapCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* User marker */}
              {userLocation && (
                <Marker 
                  position={userLocation}
                  icon={new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                  })}
                >
                  <Popup>Your Location</Popup>
                </Marker>
              )}
              
              {/* Ambulance markers (without clustering) */}
              {ambulances.map(ambulance => (
                <Marker 
                  key={ambulance.id} 
                  position={ambulance.position}
                  icon={ambulanceIcon}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{ambulance.name}</h3>
                      <p className={`font-medium ${
                        ambulance.status === "Available" 
                          ? "text-green-500" 
                          : ambulance.status === "On Route" 
                            ? "text-yellow-500" 
                            : "text-gray-500"
                      }`}>
                        {ambulance.status}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">ETA: {ambulance.eta}</p>
                      <div className="mt-2 flex justify-center space-x-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                          <FaPhoneAlt className="mr-1" /> Call
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                          <FaRoute className="mr-1" /> Route
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">Map Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" alt="You" className="h-6 mr-2" />
              <span>Your Location</span>
            </div>
            <div className="flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991303.png" alt="Ambulance" className="h-6 mr-2" />
              <span>Ambulance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceTracking; 