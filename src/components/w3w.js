import React from 'react';
import { useState } from 'react';
import { What3wordsAutosuggest } from '@what3words/react-components';
import Image from '../assets/logos/logo-coloured.png';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

function AutoSuggest() {
  const [value, setValue] = useState('');
  const onChange = (e) => setValue(e.target.value);
  const w3wIcon = L.icon({
    // iconUrl: 'https://map.what3words.com/map/marker.png',
    iconUrl: Image,
    iconSize: [64, 64], // size of the icon
    iconAnchor: [25, 59], // point of the icon which will correspond to marker's location
  });

  const map = React.useRef();
  let markers = [];

  const init = () => {
    map.current = L.map('map', { zoomControl: false }).setView(
      [51.520847, -0.195521],
      16
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxNativeZoom: 19,
      maxZoom: 25,
    }).addTo(map.current);
    new L.Control.Zoom({ position: 'bottomright' }).addTo(map.current);
  };

  const handleSuggestion = (e) => {
    console.log(e);
    console.log(window.what3words);
    what3words.api
      .convertToCoordinates(e.detail.suggestion.words)
      .then(function (response) {
        console.log('[convertToCoordinates]', response);
        if (response.coordinates) {
          // Clear out the old markers.
          markers.forEach(function (marker) {
            marker.remove();
          });
          markers = [];

          let marker = L.marker(
            [response.coordinates.lat, response.coordinates.lng],
            { icon: w3wIcon }
          ).addTo(map.current);

          // Create a marker for the location
          markers.push(marker);

          // Center the map on that location, and zoom in on it to display the grid
          map.current.setView(
            [response.coordinates.lat, response.coordinates.lng],
            18
          );
        }
      });
  };

  document.addEventListener('DOMContentLoaded', init);

  return (
    <>
      <label htmlFor='w3w-auto'>Your What 3 Words address:</label>
      <What3wordsAutosuggest
        id='autosuggest'
        api_key='ZZLCNFPV'
        clip_to_country='GB'
        autosuggest_focus='51.1,2.0'
        onSelected_suggestion={handleSuggestion}
        return_coordinates='true'
      >
        <input id='w3w-auto' type='text' value={value} onChange={onChange} />
      </What3wordsAutosuggest>
      <div id='map' style={{ height: '500px', width: '500px' }}></div>
    </>
  );
}

export default AutoSuggest;
