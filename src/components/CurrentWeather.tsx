import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faSun,
  faCloud,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { getCurrentWeather, getHourlyForecast } from "./WeatherAPI";
import "../style/CurrentWeather.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface CurrentWeatherProps {
  city: string;
}

const day: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const date: Date = new Date();
console.log(date.getDate(), date.getDay());
const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city }) => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  let emoji: IconProp | null = null;
  if (weather) {
    if (weather.weather[0].main === "Clouds") {
      emoji = faCloud;
    } else if (weather.weather[0].main === "Thunderstorm") {
      emoji = faCloudRain;
    } else if (weather.weather[0].main === "Drizzle") {
      emoji = faCloudRain;
    } else if (weather.weather[0].main === "Rain") {
      emoji = faCloudRain;
    } else if (weather.weather[0].main === "Snow") {
      emoji = faSnowflake;
    } else if (weather.weather[0].main === "Haze") {
      emoji = faSmog;
    } else {
      emoji = faSun;
    }
  }
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getCurrentWeather(city);
        const forecast = await getHourlyForecast(city);
        console.log(data);
        console.log(forecast);
        setForecast(forecast);
        setWeather(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container d-flex flex-column align-items-center flex-lg-row currentWeather">
        <div className="weather-side col-6">
          <div className="weather-gradient"></div>
          <div className="date-container">
            <h2 className="date-dayname">{day[date.getDay()]}</h2>
            <span className="date-day">
              {date.getDate()} {month[date.getMonth()]} {date.getFullYear()}
            </span>
            <FontAwesomeIcon icon={faMapPin} className="location-icon" />
            <span className="location">{weather.name}</span>
          </div>
          <div className="weather-container">
            <FontAwesomeIcon icon={emoji!} className="weather-icon" />
            <h1 className="weather-temp">
              {(weather.main.temp - 273.15).toFixed(2)}°C
            </h1>
            <h3 className="weather-desc">{weather.weather[0].description}</h3>
          </div>
        </div>
        <div className="info-side col-6 d-flex flex-column bg-dark">
          <div className="today-info-container">
            <div className="today-info">
              <div className="precipitation">
                <span className="title">CLOUDINESS</span>
                <span className="value">{weather.clouds.all}%</span>
                <div className="clear"></div>
              </div>
              <div className="precipitation">
                <span className="title">PRESSURE</span>
                <span className="value">{weather.main.pressure} hPa</span>
                <div className="clear"></div>
              </div>
              <div className="precipitation">
                <span className="title">VISIBILITY</span>
                <span className="value">{weather.visibility / 1000} km</span>
                <div className="clear"></div>
              </div>
              <div className="humidity">
                <span className="title">HUMIDITY</span>
                <span className="value">{weather.main.humidity}%</span>
                <div className="clear"></div>
              </div>
              <div className="wind">
                <span className="title">WIND SPEED</span>
                <span className="value">
                  {" "}
                  {(weather.wind.speed * 3.6).toFixed(2)} km/h
                </span>
                <div className="clear"></div>
              </div>
            </div>
          </div>
          <div className="week-container col-12">
            <ul className="week-list">
              <li className="active">
                <FontAwesomeIcon icon={emoji!} className="day-icon" />
                <span className="day-name">{day[date.getDay()]}</span>
                <span className="day-temp">
                  {(weather.main.temp - 273).toFixed(0)}°C
                </span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCloud} className="day-icon" />
                <span className="day-name">{day[date.getDay() + 1]}</span>
                <span className="day-temp">
                  {(forecast?.list[13].main.temp - 273).toFixed(0)}°C
                </span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCloudSun} className="day-icon" />
                <span className="day-name">{day[date.getDay() + 2]}</span>
                <span className="day-temp">
                  {(forecast?.list[21].main.temp - 273).toFixed(0)}°C
                </span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCloudRain} className="day-icon" />
                <span className="day-name">{day[date.getDay() + 3]}</span>
                <span className="day-temp">
                  {(forecast?.list[29]?.main.temp - 273).toFixed(0)}°C
                </span>
              </li>
              <div className="clear"></div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
