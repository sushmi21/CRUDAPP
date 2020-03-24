import React, { useState, useEffect } from "react";
import AirlineItem from "./AirlineItem";

// Page to display list of all airlines and their details
const AirlineList = () => {
  const [airlinesList, setAirlinesList] = useState([]);

  // Fetch all airlines when the component mounts
  useEffect(() => {
    let isMounted = true;
    const getAirlineList = async () => {
      try {
        let url = "http://localhost:5000/api/airlines";
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        if (isMounted) setAirlinesList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAirlineList();
    return () => {
      isMounted = false;
    };
  }, []);

  // Remove the airline item from the list, when delete button is clicked in the child component
  const onDeleteAirline = async id => {
    try {
      let url = `http://localhost:5000/api/airlines/${id}`;
      const response = await fetch(url, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        setAirlinesList(airlinesList.filter(item => item._id !== id));
        console.log("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Loop through the list and display the info of each item using child component
    airlinesList.length !== 0 &&
    airlinesList.map(airline => {
      return (
        <AirlineItem
          key={airline._id}
          id={airline._id}
          airlineName={airline.name}
          countryId={airline.country}
          onDeleteAirline={onDeleteAirline}
        />
      );
    })
  );
};

export default AirlineList;
