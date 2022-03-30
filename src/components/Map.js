// import React, { useState } from 'react';
// // import { What3wordsAutosuggest } from '@what3words/react-components';
// import MapPin from '../assets/logos/logo-coloured.png';

// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
// import 'leaflet-defaulticon-compatibility';
// // import { Draggable } from 'leaflet';

// function Map({ lat, lng, onChange }) {
//   const [coordinates, setCoordinates] = useState({
//     lat: lat ?? 51.520847,
//     lng: lng ?? -0.195521, //null coalescing (??) - if long is null, it'll use provided coordantes.
//   });
//   // const onChange = (e) => setValue(e.target.value);
//   const w3wIcon = L.icon({
//     // iconUrl: 'https://map.what3words.com/map/marker.png',
//     iconUrl: MapPin,
//     iconSize: [34, 34], // size of the icon
//     iconAnchor: [25, 59], // point of the icon which will correspond to marker's location
//   });

//   const map = React.useRef();
//   let markers = []; //pin-drop for map

//   const init = () => {
//     //initialise map
//     map.current = L.map('map', { zoomControl: false }).setView(
//       // [51.520847, -0.195521],
//       [coordinates.lat, coordinates.lng],
//       16
//     );
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       maxNativeZoom: 19,
//       maxZoom: 25,
//     }).addTo(map.current);
//     new L.Control.Zoom({ position: 'bottomright' }).addTo(map.current);
//   };

//   const updateMap = (lat, lng) => {
//     // Clear out the old markers.
//     markers.forEach(function (marker) {
//       marker.remove();
//     });
//     markers = [];

//     let marker = L.marker(
//       [lat, lng],
//       { icon: w3wIcon },
//       { draggable: 'true' }
//     ).addTo(map.current);

//     // Create a marker for the location
//     markers.push(marker);

//     // Center the map on that location, and zoom in on it to display the grid
//     map.current.setView([lat, lng], 18);
//     setCoordinates({ lat, lng });
//   };

//   React.useEffect(() => {
//     if (onChange) {
//       onChange({ ...coordinates });
//     }
//   }, [coordinates]);

//   const handleGps = () => {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       console.log('Latitude is :', position.coords.latitude);
//       console.log('Longitude is :', position.coords.longitude);
//       updateMap(position.coords.latitude, position.coords.longitude);
//       // if ('geolocation' in navigator) {
//       //   console.log('Available');
//       // } else {
//       //   console.log('Not Available');
//       // }
//     });
//   };

//   // const handleSuggestion = (e) => {
//   //   console.log(e);
//   //   console.log(window.what3words);
//   //   what3words.api
//   //     .convertToCoordinates(e.detail.suggestion.words)
//   //     .then(function (response) {
//   //       console.log('[convertToCoordinates]', response);
//   //       if (response.coordinates) {
//   //         updateMap(response.coordinates.lat, response.coordinates.lng);
//   //       }
//   //     });
//   // };

//   document.addEventListener('DOMContentLoaded', init);

//   return (
//     <>
//       <button
//         id='w3wbutton'
//         className='button is-info is-light'
//         onClick={handleGps}
//       >
//         Locate me
//       </button>
//       {/* <What3wordsAutosuggest
//         id='autosuggest'
//         api_key='ZZLCNFPV'
//         clip_to_country='GB'
//         autosuggest_focus='51.1,2.0'
//         onSelected_suggestion={handleSuggestion}
//         return_coordinates='true'
//       >
//         <input id='w3w-auto' type='text' value={value} onChange={onChange} />
//       </What3wordsAutosuggest> */}
//       <div id='map' style={{ height: '500px', width: '500px' }}></div>
//     </>
//   );
// }

// export default Map;

import React, { useState, useffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';

function Map({ lat, lng }) {
  const [position, setPosition] = React.useState([51.505, -0.09]);
  const [map, setMap] = useState();
  const handleGps = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      setPosition([location.coords.latitude, location.coords.longitude]);
    });
  };

  return (
    <>
      <button
        id='w3wbutton'
        className='button is-info is-light'
        onClick={handleGps}
        type='button'
      >
        Locate me
      </button>
      <div className='map-container'>
        <MapContainer key={position[0]} center={position} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
