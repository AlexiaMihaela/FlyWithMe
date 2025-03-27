import { useState } from "react";
import { TextInput, Alert } from "@mantine/core";
import Sunny from "../../assets/sunny.png";
import Rainy from "../../assets/rainy.png";
import Snowy from "../../assets/snow.png";
import Cloudy from "../../assets/clouds.png";
import "./Weather.css";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!location) return;
    setError("");
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const weatherData = await res.json();

      if (res.ok) {
        setData(weatherData);
      } else {
        setData(null);
        setError(weatherData.message || "Something went wrong");
      }
    } catch (err) {
      setData(null);
      setError("Network error");
    }
  };

  const weatherImages = {
    Clear: Sunny,
    Clouds: Cloudy,
    Rain: Rainy,
    Snow: Snowy,
    Haze: Cloudy,
    Mist: Cloudy,
  };

  const weatherImage = data?.weather
    ? weatherImages[data.weather[0].main] || Cloudy
    : null;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <>
      <div className="search-input">
        <TextInput
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
        />
        {error && (
          <Alert color="red" mt="sm">
            {error}
          </Alert>
        )}
      </div>

      {data && data.weather && (
        <div className="container">
          <div className="top-row">
            <div className="location">{data.name}</div>
            <div className="date">{formattedDate}</div>
          </div>

          <div className="center-content">
            {weatherImage && (
              <img src={weatherImage} alt="weather" className="icon" />
            )}
            <div className="temp">{Math.floor(data.main.temp)}°C</div>
          </div>

          <div className="bottom-row">
            <div className="humidity">
              <div className="dataname">Humidity</div>
              <div className="data">{data.main.humidity}%</div>
            </div>
            <div className="weathertype">{data.weather[0].main}</div>
            <div className="wind">
              <div className="dataname">Wind</div>
              <div className="data">{data.wind.speed} km/h</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
