import axios from "axios";
import Base_Url from "./config";

const api_key = "0627a4f47b3949f3b3f82300230306";

const getWeather = async (location) => {
  const instance = axios.create({
    baseURL: Base_Url,
    timeout: 20000,
    headers: {
      Accept: "application/json",
    },
  });
  return instance
    .get(`forecast.json?key=${api_key}&days=8&q=${location}`)
    .then((response) => {
      if (response) {
        return response?.data;
      }
    });
};

export default getWeather;
