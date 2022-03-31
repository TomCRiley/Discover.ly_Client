import React from 'react';
import { useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';

const center = {
  lat: 51.505,
  lng: -0.09,
};

function MapExperi() {
  const [position, setPosition] = useState(center);

  const handleGps = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  function SetViewOnClick() {
    const map = useMapEvent('click', () => {
      map.flyTo(position, map.getZoom());
    });
    return null;
  }

  function DraggableMarker() {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker !== null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );

    console.log(position);

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        autoPan={true}
      ></Marker>
    );
  }

  return (
    <>
      <button
        id="w3wbutton"
        className="button is-success is-light"
        onClick={handleGps}
      >
        Locate me
      </button>
      <p className="">
        Latitude: {position.lat}, Longitude: {position.lng}
      </p>
      <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetViewOnClick />
        <DraggableMarker />
      </MapContainer>
    </>
  );
}

export default MapExperi;
