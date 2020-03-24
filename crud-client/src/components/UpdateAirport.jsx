import React, { useEffect, useState } from "react";
import AirportForm from "./AirportForm";
import useCountryInfoFetch from "../customHooks/useCountryInfoFetch";

// Page to update the airport info
const UpdateAirport = props => {
  const [airportInfo, setAirportInfo] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const countryInfo = useCountryInfoFetch(
    airportInfo !== null ? airportInfo.country : ""
  );

  // Fetch the airport info for a given airport id when the component mounts
  useEffect(() => {
    let isMounted = true;
    const getAirportInfo = async () => {
      try {
        let url = `http://localhost:5000/api/airports/${props.match.params.id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        if (isMounted) {
          setAirportInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAirportInfo();
    return () => {
      isMounted = false;
    };
  }, [props.match.params.id]);

  useEffect(() => {
    let isMounted = true;
    // After airport info is fetched, fetch the coordinates for the airport's address - forward geocoding
    const getLatLng = async () => {
      const countryCode = countryInfo.shortCode.toLowerCase();
      // const countryCode = "de"; // search only inside germany
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${airportInfo.location}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}&cachebuster=1568355381620&autocomplete=true&country=${countryCode}&types=address%2Ccountry`;
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
        const coords = await data.features[0].geometry.coordinates;
        if (isMounted) {
          setCoordinates({ lat: coords[1], lng: coords[0] });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (airportInfo !== null && countryInfo !== null) getLatLng();
    return () => {
      isMounted = false;
    };
  }, [airportInfo, countryInfo]);

  return (
    // Fill the form for updation
    <div>
      <h4 className="pb-3">Update Airport</h4>
      {airportInfo !== null && !loading && (
        <AirportForm
          arName={airportInfo.name}
          arLocation={airportInfo.location}
          arCountry={airportInfo.country}
          arAirlines={airportInfo.airlines}
          id={props.match.params.id}
          coordinates={coordinates}
        />
      )}
      {loading && <div>Loading....</div>}
    </div>
  );
};

export default UpdateAirport;
