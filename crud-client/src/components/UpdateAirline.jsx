import React, { useEffect, useState } from "react";
import AirlineForm from "./AirlineForm";

// Update Page for Airline
const UpdateAirline = props => {
  const [airlineInfo, setAirlineInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the info of airline for a given airline id
  useEffect(() => {
    let isMounted = true;
    const getAirlineInfo = async () => {
      try {
        let url = `http://localhost:5000/api/airlines/${props.match.params.id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        if (isMounted) {
          setAirlineInfo(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAirlineInfo();
    return () => {
      isMounted = false;
    };
  }, [props.match.params.id]);

  return (
    <div>
      <h4 className="pb-3">Update Airline</h4>
      {/* Display the prefilled form for updation */}
      {airlineInfo !== null && !loading && (
        <AirlineForm
          arName={airlineInfo.name}
          arCountry={airlineInfo.country}
          id={props.match.params.id}
        />
      )}
      {loading && <div>Loading....</div>}
    </div>
  );
};

export default UpdateAirline;
