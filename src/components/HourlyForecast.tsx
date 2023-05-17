import React, { useEffect, useState } from "react";
import { getHourlyForecast } from "./WeatherAPI";
import "../style/HourlyForecast.css";

interface HourlyForecastProps {
  city: string;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ city }) => {
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getHourlyForecast(city);
        setForecast(data.list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchForecast();
  }, [city]);

  if (forecast.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="HourlyForecast me-3 w-100">
      <h2>Statistical Weather</h2>
      <div className="dataSection overflow-y-scroll w-10">
        {forecast.map((item, index) => (
          <div key={index} className="HourlyForecastItem">
            <p>Date/Time: {item.dt_txt}</p>
            <p>Temperature: {(item.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Humidity: {item.main.humidity}%</p>
            <p>Description: {item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
