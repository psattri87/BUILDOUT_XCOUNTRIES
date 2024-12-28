import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "./Loader";

const url = "https://xcountries-backend.azurewebsites.net/all";

function App() {
  const [countryData, setCountryData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setLoading(false);
      if (response.status === 200) {
        setCountryData(response.data);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : !countryData ? (
        <h2>Data not found!</h2>
      ) : (
        countryData.map((country, index) => {
          return (
            <div key={index} className="card">
              <img className="flagImage" src={country.flag} alt="flag" />
              <div>{country.name}</div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
