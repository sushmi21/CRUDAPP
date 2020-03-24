import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import CountryDropDown from "./CountryDropDown";

// Form to add and update airline info
const AirlineForm = ({ arName, arCountry, id }) => {
  const [airlineName, setAirlineName] = useState(arName);
  const [airlineCountryId, setAirlineCountryId] = useState(arCountry);
  const history = useHistory();

  // Common for Addition and Updation of Airline
  const handleFormSubmit = async () => {
    try {
      let url;
      let method;
      let successMsg;
      // Set the endpoint, req type and success message based on the url of client
      if (window.location.pathname !== `/updateairline/${id}`) {
        url = "http://localhost:5000/api/airlines/add";
        method = "POST";
        successMsg = "Airline Added successfully";
      } else {
        url = `http://localhost:5000/api/airlines/update/${id}`;
        method = "PUT";
        successMsg = "Airline Updated successfully";
      }
      const response = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: airlineName,
          country: airlineCountryId
        })
      });
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        console.log(successMsg);
        setAirlineName("");
        // Navigate to Airlines list page after successful addition or updation
        history.push("/airlines");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: "40rem" }}>
      <h5>Airline Details</h5>
      <Form>
        <FormGroup className="mb-md-0">
          <Label for="airlineName">Name</Label>
          <Input
            type="text"
            name="airlineName"
            id="airlineName"
            value={airlineName}
            placeholder="Airline Name"
            onChange={e => setAirlineName(e.target.value)}
          />
        </FormGroup>

        {/* Country Dropdown component */}
        <CountryDropDown
          defaultSelection={airlineCountryId} //send initial value for dropdown
          dropDownID="airlineCountry"
          handleSelectedCountryId={id => setAirlineCountryId(id)} //callback to set the currently selected coutry id
        />

        <Button color="primary" className="my-3" onClick={handleFormSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

AirlineForm.propTypes = {
  arName: PropTypes.string,
  arCountry: PropTypes.string,
  id: PropTypes.string
};

AirlineForm.defaultProps = {
  arName: "",
  arCountry: "",
  id: ""
};

export default AirlineForm;
