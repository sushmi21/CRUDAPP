import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";

// Select Input component for coutries
const CountryDropDown = ({
  defaultSelection,
  dropDownID,
  handleSelectedCountryId
}) => {
  const [countryList, setCountryList] = useState([]);

  // Fetch the list of all countries on component mount
  useEffect(() => {
    let isMounted = true;
    const getCountryList = async () => {
      try {
        let url = "http://localhost:5000/api/countries";
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        if (isMounted) setCountryList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountryList();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    // Populate the select input with the list of countries
    <FormGroup className="my-3">
      <Label for="exampleSelect">Country</Label>
      <Input
        type="select"
        name={dropDownID}
        id={dropDownID}
        value={defaultSelection}
        onChange={e => {
          handleSelectedCountryId(e.target.value); //call back to set the selected country id from the dropdown
        }}
      >
        <option value=" " hidden>
          --Country--
        </option>
        {countryList.length !== null &&
          countryList.map(item => {
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

CountryDropDown.propTypes = {
  defaultSelection: PropTypes.string,
  dropDownID: PropTypes.string,
  handleSelectedCountryId: PropTypes.func
};

CountryDropDown.defaultProps = {
  defaultSelection: " ",
  dropDownID: "countryDropDown",
  handleSelectedCountryId: () => {}
};
export default CountryDropDown;
