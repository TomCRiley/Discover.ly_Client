import React from 'react';
// import { Icon } from 'leaflet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const center = {
  lat: 51.505,
  lng: -0.09,
};

function MapExperi() {
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
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
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <DraggableMarker />
    </MapContainer>
  );
}

export default MapExperi;
