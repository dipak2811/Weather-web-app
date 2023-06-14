import React, { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Navbar from "./components/Navbar";
import HourlyForecast from "./components/HourlyForecast";
import "./App.css";
const App: React.FC = () => {
  const [city, setCity] = useState<string>("Ahmedabad");
  const setCityCallback = (city: string | undefined): void => {
    if (city) {
      console.log(city);
      setCity(city);
    }
  };
  return (
    <>
      <h1 className="title">Weather App</h1>
      <Navbar cityCallBack={setCityCallback} />
      <div className="app-container">
        <CurrentWeather city={city} />

        <div className="d-flex mt-3 rounded-5">
          <HourlyForecast city={city} />
        </div>
      </div>
    </>
  );
};

export default App;
