import React, { useEffect, useState } from "react";
import { FormGroup, Label, CustomInput } from "reactstrap";

const AirlineCheckbox = ({
  elementId,
  handleSelectedAirlineId,
  selectedAirlineList
}) => {
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
    <FormGroup>
      <Label for={elementId}>Airlines</Label>
      <div>
        {airlineList.length !== null &&
          airlineList.map(item => {
            return (
              <CustomInput
                type="checkbox"
                key={item._id}
                id={item._id}
                label={`${item.name}`}
                defaultChecked={selectedAirlineList.includes(item._id)}
                onClick={e => handleSelectedAirlineId(e.target.id)}
              />
            );
          })}
      </div>
    </FormGroup>
  );
};

export default AirlineCheckbox;
