import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Card, Button } from "reactstrap";
import useCountryInfoFetch from "../customHooks/useCountryInfoFetch";

// Displays information about a single airline which can be edited or deleted
const AirlineItem = ({ id, airlineName, countryId, onDeleteAirline }) => {
  const country = useCountryInfoFetch(countryId); //country info for a given country id

  return (
    country !== null && (
      <Card className="p-2 mx-auto my-3" style={{ maxWidth: "50rem" }}>
        <div>Airline Name: {airlineName}</div>
        <div>Country Name: {country.name}</div>
        <div>Country Code: {country.code}</div>
        <div>
          <Button className="m-2">
            {/* Navigate to update form to update the airline */}
            <NavLink
              to={`/updateairline/${id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Edit
            </NavLink>
          </Button>
          <Button
            color="danger"
            className="m-2"
            onClick={() => onDeleteAirline(id)} //callback to delete the selected airline item
          >
            Delete
          </Button>
        </div>
      </Card>
    )
  );
};

AirlineItem.propTypes = {
  airlinename: PropTypes.string,
  location: PropTypes.string,
  countryId: PropTypes.string,
  airlines: PropTypes.arrayOf(PropTypes.string),
  onDeleteAirline: PropTypes.func
};

AirlineItem.defaultProps = {
  airlinename: "",
  location: "",
  countryId: "",
  airlines: [],
  onDeleteAirline: () => {}
};
export default AirlineItem;
