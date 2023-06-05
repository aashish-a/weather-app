import React, { useEffect, useState } from "react";

import "./App.css";
import WeatherByDay from "./components/WeatherByDay";
import SavedDataCard from "./components/WeatherByHour";
import getWeather from "./config/Services";
import moment from "moment";
import Loading from "./components/Loading";

function App() {
  const [weather, setWeather] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState([]);
  const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    getDaysWeather();
    getSavedWeather();
  }, []);

  const getDaysWeather = async () => {
    // Fetch weather data for a specific location (default location: "delhi")
    try {
      const res = await getWeather("delhi");
      // Set the weather and forecast data in the state and current weather
      setForecast(res?.forecast?.forecastday);
      setWeather(res);
    } catch (error) {
    } finally {
      // Set loading to false once the weather data is fetched
      setLoading(false);
    }
  };

  const getSavedWeather = async () => {
    try {
      // Retrieve saved weather data from local storage
      const localData = localStorage.getItem("data");

      if (!localData) return;

      // Parse the saved data into an array of locations
      const parsedData = JSON.parse(localData);

      const promises = parsedData.map(({ name }) => getWeather(name));
      // Fetch weather data for each saved location using Promise.all
      const responses = await Promise.all(promises);

      // Set the saved weather data in the state
      setSavedData(responses);
    } catch (error) {
      console.log("Error", error);
    } finally {
      // Set loading to false once the weather data is fetched
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    // Set loading to true when initiating the search
    setLoading(true);
    try {
      // Fetch weather data for the search query location
      const res = await getWeather(searchQuery);
      setWeather(res);
      setForecast(res?.forecast?.forecastday);
      getSavedWeather();
    } catch (error) {}
  };

  const saveData = () => {
    // initialize null array
    let newLocalData = [];
    // c
    let localData = localStorage.getItem("data");
    if (localData) {
      // Save the new search query as already exit data in local storage
      newLocalData.push({ name: searchQuery }, ...JSON.parse(localData));
      localStorage.setItem("data", JSON.stringify(newLocalData));
    } else {
      // Save the new search query in local storage
      newLocalData.push({ name: searchQuery });
      localStorage.setItem("data", JSON.stringify(newLocalData));
    }
  };

  return (
    <>
      {loading ? (
        <div className="center">
          <Loading />
        </div>
      ) : (
        <main className="main-container">
          <div className="header">
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter location"
                className="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* Button to trigger the search */}
              <button className="search-button" onClick={() => handleSearch()}>
                Search
              </button>
            </div>
            {/* Button to save the current search query */}
            <button className="save-button" onClick={() => saveData()}>
              Save
            </button>
          </div>
          <div className="location-and-date">
            <h1 className="location-and-date__location">
              {weather?.location?.name}, {weather?.location?.country}
            </h1>
            <div>
              {/* format date using moment js */}
              {moment(weather?.location?.localtime)
                .locale("en")
                .format("dddd Do MMMM")}
            </div>
          </div>
          <div className="weather-by-hour">
            <h2 className="weather-by-hour__heading">Weather history</h2>
            <div className="weather-by-hour__container">
              {/* showing all the saved cities weather */}
              {savedData?.map((item) => {
                return <SavedDataCard data={item} />;
              })}
            </div>
          </div>

          <div className="current-temperature">
            <div className="current-temperature__icon-container">
              <img
                src={`https:${weather?.current?.condition?.icon}`}
                className="current-temperature__icon"
                alt={weather?.current?.condition?.text}
              />
            </div>
            <div className="current-temperature__content-container">
              <div className="current-temperature__value">
                {weather?.current?.temp_c}&deg;
              </div>
              <div className="current-temperature__summary">
                Mostly {weather?.current?.condition?.text}
              </div>
            </div>
          </div>

          <div className="current-stats">
            <div>
              <div className="current-stats__value">
                {weather?.current?.wind_mph}mph
              </div>
              <div className="current-stats__label">Wind</div>
              <div className="current-stats__value">
                {weather?.current?.precip_in}%
              </div>
              <div className="current-stats__label">Rain</div>
            </div>
            <div>
              <div className="current-stats__value">
                {weather?.current?.vis_km}km
              </div>
              <div className="current-stats__label">Visibility</div>
              <div className="current-stats__value">
                {weather?.current?.humidity}
              </div>
              <div className="current-stats__label">humidity</div>
            </div>
          </div>
          <div className="next-5-days">
            <h2 className="next-5-days__heading">Next 7 days</h2>
            <div className="next-5-days__container">
              {forecast.slice(1).map((item, index) => {
                return <WeatherByDay data={item} key={index} />;
              })}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
