import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useCountryInfoFetch from "../customHooks/useCountryInfoFetch";

// Component to display the details of single airline
const AirlineInfo = ({ airlineId }) => {
  const [airline, setAirline] = useState([]);
  const countryInfo = useCountryInfoFetch(
    airline !== null ? (airline.length !== 0 ? airline.country : "") : ""
  ); //custom hook to fetch the country name and code for a given country id

  // For a given airline id, fetch the airline info on mount and whenever the id changes
  useEffect(() => {
    let isMounted = true;
    const getAirlineInfo = async () => {
      try {
        let url = `http://localhost:5000/api/airlines/${airlineId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        if (isMounted) setAirline(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAirlineInfo();
    return () => {
      isMounted = false;
    };
  }, [airlineId]);

  return (
    // Display the fetched info
    airline !== null &&
    countryInfo !== null && (
      <div className="p-2 mx-auto my-3" style={{ maxWidth: "50rem" }}>
        <div>Airline Name: {airline.name}</div>
        <div>Country Name: {countryInfo.name}</div>
        <div>Country Code: {countryInfo.code}</div>
      </div>
    )
  );
};

AirlineInfo.propTypes = {
  airlineId: PropTypes.string.isRequired
};

export default AirlineInfo;
