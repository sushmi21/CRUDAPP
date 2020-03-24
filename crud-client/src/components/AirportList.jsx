import React, { useState, useEffect } from "react";
import AirportItem from "./AirportItem";

// Page to display list of all airports
const AirportList = () => {
  const [airportsList, setAirportsList] = useState([]);
  const [loading, setLoading] = useState([true]);

  // Fetch the list when the component mounts
  useEffect(() => {
    let isMounted = true;
    const getAirportList = async () => {
      try {
        let url = "http://localhost:5000/api/airports";
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        console.log(data);
        if (isMounted) {
          setAirportsList(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAirportList();
    return () => {
      isMounted = false;
    };
  }, []);

  //Call back to delete the airport when Delete button clicked in child
  const onDeleteAirport = async id => {
    try {
      let url = `http://localhost:5000/api/airports/${id}`;
      const response = await fetch(url, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        setAirportsList(airportsList.filter(item => item._id !== id));
        console.log("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Loop through the list and display each item using child
    airportsList.length !== 0 &&
    !loading &&
    airportsList.map(airport => {
      return (
        <AirportItem
          key={airport._id}
          id={airport._id}
          airportName={airport.name}
          location={airport.location}
          countryId={airport.country}
          airlines={airport.airlines}
          onDeleteAirport={onDeleteAirport}
        />
      );
    })
  );
};

export default AirportList;
