import React, { useState } from 'react';
import { Search, CloudRain, Sun, Cloud, Wind, Droplets, ThermometerSun, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to get coordinates for a city using the API
  const getCoordinates = async (cityName) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
      );
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('City not found');
      }
      
      return data.results[0];
    } catch (err) {
      throw new Error('Failed to find location');
    }
  };

  // Function to get weather data using coordinates
  const getWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );
      const data = await response.json();
      return data.current;
    } catch (err) {
      throw new Error('Failed to fetch weather data');
    }
  };

  // Function to return weather condition and icon
  const getWeatherInfo = (code) => {
    if (code <= 3) return { text: 'Clear/Partly Cloudy', icon: <Sun className="w-16 h-16 text-yellow-500" /> };
    if (code <= 48) return { text: 'Foggy/Cloudy', icon: <Cloud className="w-16 h-16 text-gray-500" /> };
    if (code <= 67) return { text: 'Rainy', icon: <CloudRain className="w-16 h-16 text-blue-500" /> };
    return { text: 'Severe Weather', icon: <CloudRain className="w-16 h-16 text-red-500" /> };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const coords = await getCoordinates(city);
      const weatherData = await getWeather(coords.latitude, coords.longitude);
      setWeather({
        ...weatherData,
        cityName: coords.name,
        country: coords.country
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Weather Now</h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
              disabled={loading}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
            <p className="mt-2 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {weather && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {weather.cityName}, {weather.country}
              </h2>
              {getWeatherInfo(weather.weather_code).icon}
              <p className="text-lg text-gray-600 mt-2">
                {getWeatherInfo(weather.weather_code).text}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-600">Temperature</span>
                </div>
                <p className="text-2xl font-semibold mt-1">{weather.temperature_2m}°C</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">Humidity</span>
                </div>
                <p className="text-2xl font-semibold mt-1">{weather.relative_humidity_2m}%</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Wind Speed</span>
                </div>
                <p className="text-2xl font-semibold mt-1">{weather.wind_speed_10m} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;