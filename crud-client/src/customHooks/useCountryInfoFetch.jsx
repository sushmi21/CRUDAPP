import { useState, useEffect } from "react";

// Hook to fetch the country info for a given countryid
export default countryId => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getCountry = async () => {
      try {
        let url = `http://localhost:5000/api/countries/${countryId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" }
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        const data = await response.json();
        if (isMounted) setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (countryId !== null && countryId !== "") getCountry();
    return () => {
      isMounted = false;
    };
  }, [countryId]);

  return country;
};
