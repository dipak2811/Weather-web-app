import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getCurrentWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const getHourlyForecast = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hourly forecast:", error);
    throw error;
  }
};

export const getCityDeatailsFromCoords = async (lat: string, lon: string) => {
  try {
    console.log("calling");

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    console.log(response, "response");

    return response.data.name;
  } catch (error) {
    console.error("Error fetching city from coords", error);
    throw error;
  }
};
