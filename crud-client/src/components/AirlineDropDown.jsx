import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";

// A select input component which contains names of all airlines in the DB

const AirlineDropDown = ({ dropDownID, handleSelectedAirlineId }) => {
  const [airlineList, setAirlineList] = useState([]);

  // Fetch all the airlines on component mount
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
        if (isMounted) setAirlineList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAirlineList();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <FormGroup className="mb-md-0">
      <Label for="exampleSelect">Airline</Label>
      <Input
        type="select"
        name={dropDownID}
        id={dropDownID}
        onChange={e => handleSelectedAirlineId(e.target.value)}
      >
        {/* Loop through the list of airlines and populate the select component */}
        <option value="">--Airline--</option>
        {airlineList.length !== null &&
          airlineList.map(item => {
            return (
              <option key={item._id} id={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
      </Input>
    </FormGroup>
  );
};

export default AirlineDropDown;
