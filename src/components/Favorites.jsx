import React from "react";
import { getWeatherByCity, getForecastByCoords } from "../services/WeatherService";
import "./Favorites.css";

const Favorites = ({ favorites, setWeather, setForecast, setFavorites }) => {
  
  const handleFavoriteClick = async (city) => {
    try {
      const weatherData = await getWeatherByCity(city);
      const forecastData = await getForecastByCoords(weatherData.coord.lat, weatherData.coord.lon);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h3 className="favorites-title">Favorites</h3>
      <ul className="favorites-list">
        {favorites.map((city, index) => (
          <li key={city} className="favorites-item">
            <button onClick={() => handleFavoriteClick(city)} className="favorites-button">
              {city}
            </button>
            <button onClick={() => removeFavorite(city)} className="remove-button">
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
