import React, { useState } from 'react';
import { Icon } from '../atoms';
import { Station } from '../../utils/stations';

interface RouteMapProps {
  fromStation: Station;
  toStation: Station;
  googleMapsApiKey?: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ 
  fromStation, 
  toStation,
  googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
}) => {
  const [imageError, setImageError] = useState(false);

  // Use Static Maps API instead of interactive map for faster loading
  const getStaticMapUrl = () => {
    const apiKey = googleMapsApiKey || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
    const size = '600x400';
    const markers = [
      `color:green|label:A|${fromStation.lat},${fromStation.lng}`,
      `color:red|label:B|${toStation.lat},${toStation.lng}`
    ].join('&markers=');
    
    // Add path between stations
    const path = `color:0x008037|weight:5|${fromStation.lat},${fromStation.lng}|${toStation.lat},${toStation.lng}`;
    
    return `https://maps.googleapis.com/maps/api/staticmap?size=${size}&markers=${markers}&path=${path}&key=${apiKey}`;
  };

  // Calculate approximate distance and time
  const calculateDistance = () => {
    const R = 6371; // Earth radius in km
    const dLat = (toStation.lat - fromStation.lat) * Math.PI / 180;
    const dLng = (toStation.lng - fromStation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(fromStation.lat * Math.PI / 180) * Math.cos(toStation.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    
    // Assume average bike speed of 10 km/h
    const timeInMinutes = Math.round((distance / 10) * 60);
    
    return {
      distance: `~${distance.toFixed(1)} km`,
      time: `~${timeInMinutes} phút`
    };
  };

  const { distance, time } = calculateDistance();

  return (
    <div className="w-full">
      {/* Static Map Image - loads instantly, or fallback SVG */}
      <div className="relative w-full h-[400px] rounded-card overflow-hidden bg-primary-8 border-2 border-primary">
        {!imageError ? (
          <>
            <img
              src={getStaticMapUrl()}
              alt="Route map"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <Icon name="location" size={16} className="text-primary" />
                <span className="text-caption font-semibold text-primary">
                  {distance}
                </span>
              </div>
            </div>
          </>
        ) : (
          /* Fallback SVG map illustration when image fails to load */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-8 to-primary-16">
            <svg className="w-full h-full p-8" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00803720" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="600" height="400" fill="url(#grid)" />
              
              {/* Route path */}
              <path
                d="M 100 300 Q 300 100 500 100"
                stroke="#008037"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="10 5"
              />
              
              {/* Start marker */}
              <circle cx="100" cy="300" r="20" fill="#008037" />
              <circle cx="100" cy="300" r="15" fill="white" />
              <text x="100" y="305" textAnchor="middle" fill="#008037" fontSize="16" fontWeight="bold">A</text>
              
              {/* End marker */}
              <circle cx="500" cy="100" r="20" fill="#DC2626" />
              <circle cx="500" cy="100" r="15" fill="white" />
              <text x="500" y="105" textAnchor="middle" fill="#DC2626" fontSize="16" fontWeight="bold">B</text>
              
              {/* Distance label */}
              <rect x="250" y="180" width="100" height="40" fill="white" stroke="#008037" strokeWidth="2" rx="8" />
              <text x="300" y="205" textAnchor="middle" fill="#008037" fontSize="14" fontWeight="bold">
                {distance}
              </text>
              
              {/* Bike icon on route */}
              <g transform="translate(300, 160)">
                <circle cx="0" cy="0" r="25" fill="#008037" opacity="0.2" />
                <text x="0" y="5" textAnchor="middle" fontSize="24">🚲</text>
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Route Details */}
      <div className="mt-4 p-4 bg-primary-8 rounded-card border border-primary">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <p className="text-body font-semibold text-primary">
                {fromStation.name}
              </p>
            </div>
            <div className="ml-1.5 w-0.5 h-6 bg-primary"></div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <p className="text-body font-semibold text-primary">
                {toStation.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-caption text-text-secondary">Khoảng cách</p>
            <p className="text-body-md font-bold text-primary">
              {distance}
            </p>
            <p className="text-caption text-text-secondary mt-2">Thời gian dự kiến</p>
            <p className="text-body-md font-bold text-primary">
              {time}
            </p>
          </div>
        </div>
      </div>
      
      {/* Open in Google Maps link */}
      <div className="mt-3">
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${fromStation.lat},${fromStation.lng}&destination=${toStation.lat},${toStation.lng}&travelmode=bicycling`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-body text-primary hover:text-primary-dark transition-colors"
        >
          <Icon name="info" size={16} />
          <span className="font-medium">Xem chỉ đường trên Google Maps</span>
        </a>
      </div>
    </div>
  );
};

export default RouteMap;
