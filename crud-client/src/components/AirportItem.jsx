import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Card, Button } from "reactstrap";
import AirlineInfo from "./AirlineInfo";
import useCountryInfoFetch from "../customHooks/useCountryInfoFetch";

// Child component to diaplay details about one airport
const AirportItem = ({
  id,
  airportName,
  location,
  countryId,
  airlines,
  onDeleteAirport
}) => {
  const countryInfo = useCountryInfoFetch(countryId); //country info for a given country id

  return (
    countryInfo !== null && (
      <Card className="p-2 mx-auto my-3" style={{ maxWidth: "50rem" }}>
        <div>Name: {airportName}</div>
        <div>Location: {`${location}, ${countryInfo.name}`}</div>
        <div>
          Airlines List:
          <div>
            {airlines.length !== 0 &&
              airlines.map(item => {
                return <AirlineInfo key={item} airlineId={item} />;
              })}
          </div>
        </div>
        <div>
          <Button className="m-2">
            <NavLink
              to={`/updateairport/${id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Edit
            </NavLink>
          </Button>
          <Button
            color="danger"
            className="m-2"
            onClick={() => onDeleteAirport(id)}
          >
            Delete
          </Button>
        </div>
      </Card>
    )
  );
};

AirportItem.propTypes = {
  airportname: PropTypes.string,
  location: PropTypes.string,
  countryId: PropTypes.string,
  airlines: PropTypes.arrayOf(PropTypes.string),
  onDeleteAirport: PropTypes.func
};

AirportItem.defaultProps = {
  airportname: "",
  location: "",
  countryId: "",
  airlines: [],
  onDeleteAirport: () => {}
};
export default AirportItem;
