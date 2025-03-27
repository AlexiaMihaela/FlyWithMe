import { useState } from "react";
import { TextInput, Text, Stack, Alert } from "@mantine/core";

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

  return (
    <Stack align="center" spacing="md">
      <TextInput
        placeholder="Enter city"
        value={location}
        onChange={(e) => setLocation(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") fetchWeather();
        }}
      />

      {error && (
        <Alert color="red">
          {error}
        </Alert>
      )}

      {data && (
        <>
          <Text size="lg">{data.name}</Text>
          <Text size="xl">{Math.round(data.main.temp)}°C</Text>
        </>
      )}
    </Stack>
  );
};

export default Weather;
