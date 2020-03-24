import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = ({ revereseGeocodingLocation, google, coordinates }) => {
  const mapStyles = { width: "100%", height: "60vh" };
  const [position, setPosition] = useState(coordinates);

  // fetch the address details for given lat and lng. Fetch happens whenever the marker position is changed
  useEffect(() => {
    let isMounted = true;
    const getLocationAddress = async () => {
      const lng = position.lat;
      const lat = position.lng;
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&cachebuster=1568355381620&autocomplete=true&types=address`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        if (isMounted) revereseGeocodingLocation(data.features[0]); //callback to set the location info
      } catch (error) {
        console.log(error);
      }
    };
    if (position !== null) getLocationAddress();
    return () => {
      isMounted = false;
    };
  }, [position, revereseGeocodingLocation]);

  // Get marker position
  const onMarkerDragEnd = coord => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setPosition({ lat, lng });
  };

  return (
    <div style={{ position: "relative" }}>
      <Map
        google={google}
        zoom={6}
        style={mapStyles}
        initialCenter={{ lat: 51.1657, lng: 10.4515 }}
      >
        {position !== null && (
          <Marker
            position={position}
            draggable={true}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
          />
        )}
      </Map>
    </div>
  );
};

MapContainer.propTypes = {
  coordinates: PropTypes.object,
  revereseGeocodingLocation: PropTypes.func
};

MapContainer.defaultProps = {
  coordinates: null,
  revereseGeocodingLocation: () => {}
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
