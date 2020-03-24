import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import MapContainer from "./MapContainer";
import CountryDropDown from "./CountryDropDown";
import AirlineCheckbox from "./AirlineCheckbox";

// Common for both Airport addition and deletion
const AirportForm = ({
  arName,
  arLocation,
  arCountry,
  arAirlines,
  id,
  coordinates
}) => {
  const [airportName, setAirportName] = useState(arName);
  const [location, setLocation] = useState(arLocation);
  const [airportCountryId, setAirportCountryId] = useState(arCountry);
  const [airlineIdList, setAirlineIdList] = useState(arAirlines);
  const history = useHistory();

  const handleAirlineSelection = id => {
    if (!airlineIdList.includes(id)) {
      setAirlineIdList(prevArray => [...prevArray, id]);
    } else {
      setAirlineIdList(airlineIdList.filter(item => item !== id));
    }
  };

  // send api req based to add or update airport
  const handleFormSubmit = async () => {
    try {
      let url;
      let method;
      let successMsg;
      // Set endpoint, req type and success message based on user location
      if (window.location.pathname !== `/updateairport/${id}`) {
        url = "http://localhost:5000/api/airports/add";
        method = "POST";
        successMsg = "Airport Added successfully";
      } else {
        url = `http://localhost:5000/api/airports/update/${id}`;
        method = "PUT";
        successMsg = "Airport Updated successfully";
      }
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: airportName,
          location,
          country: airportCountryId,
          airlines: airlineIdList
        })
      });
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        console.log(successMsg);
        setAirportName("");
        history.push("/airports");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // call back to set the location and country after lat long is selected from map
  const revereseGeocodingLocation = responseAddress => {
    if (responseAddress) {
      const placeName = responseAddress.place_name; //eg: Strasse 2, 33333 Frankfurt, Germany
      const lastIndex = placeName.lastIndexOf(",");
      let loc = placeName.substring(0, lastIndex); //eg: Strasse 2, 33333 Frankfurt
      let land = placeName.substring(lastIndex + 1); //eg:  Germany
      console.log(`Country Selected from Map: ${land}`);
      setLocation(loc); //update location input field
      //Validation to check if the country selected from dropdown is same as the coutry selected in map
      const el = document.getElementById("airportCountry");
      const elText = el.options[el.selectedIndex].text; // Country selected in dropdown
      if (
        elText !== "--Country--" &&
        land !== "" &&
        land.replace(/\s+/g, "") !== elText.replace(/\s+/g, "") //remove spaces
      ) {
        document.getElementById("errorCountry").style.display = "block"; //display error
      } else {
        document.getElementById("errorCountry").style.display = "none";
      }
    }
  };

  return (
    <Row>
      <Col md="6">
        <h5>Airport Details</h5>
        <Form>
          <FormGroup>
            <Label for="airportName">Name</Label>
            <Input
              type="text"
              name="airportName"
              id="airportName"
              placeholder="Airport Name"
              value={airportName}
              onChange={e => setAirportName(e.target.value)}
            />
          </FormGroup>
          <FormGroup disabled>
            <Label for="examplePassword">Location</Label>
            <Input
              type="text"
              name="location"
              id="location"
              placeholder="Address"
              value={location}
              onChange={e => setLocation(e.target.value)}
              disabled
            />
          </FormGroup>
          {/* Country dropdown */}
          <CountryDropDown
            defaultSelection={airportCountryId}
            dropDownID="airportCountry"
            handleSelectedCountryId={id => setAirportCountryId(id)}
          />
          <span
            style={{ color: "red", fontSize: "14px", display: "none" }}
            id="errorCountry"
          >
            Country selected from dropdown does not match the map selection
          </span>

          {/* Checkbox for Airlines */}
          <AirlineCheckbox
            elementId="airlineName"
            handleSelectedAirlineId={handleAirlineSelection}
            selectedAirlineList={airlineIdList}
          />

          <Button color="primary" className="my-3" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
      <Col md="6">
        <MapContainer
          revereseGeocodingLocation={revereseGeocodingLocation}
          coordinates={coordinates}
        />
      </Col>
    </Row>
  );
};

AirportForm.propTypes = {
  arName: PropTypes.string,
  arLocation: PropTypes.string,
  arCountry: PropTypes.string,
  arAirlines: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  coordinates: PropTypes.objectOf(PropTypes.any)
};

AirportForm.defaultProps = {
  arName: "",
  arLocation: "",
  arCountry: "",
  arAirlines: [],
  id: "",
  coordinates: { lat: 51.1657, lng: 10.4515 }
};

export default AirportForm;
