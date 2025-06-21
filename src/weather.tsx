import { useState, useEffect, } from "react";
import Card from "./card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCloud } from '@fortawesome/free-solid-svg-icons';

interface WeatherData {
  name: string;
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

function Weather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherForCity = async (targetCity: string) => {
        if (!targetCity) return;
        const apiKey = `257a5e2dac441e5d1662c41efc4a5a86`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("City  not found");
            const data: WeatherData = await response.json();
            setWeather(data);
            setCity("");
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
            setWeather(null);
        }
    };

    // Fetch weather on initial render for the default city
    useEffect(() => {
        fetchWeatherForCity("blantyre");
    }, []); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleGetWeatherClick = () => {
        fetchWeatherForCity(city);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleGetWeatherClick();
        }
    };

    return (
        <>
            <h1>Weather app ☁</h1>
            <input
                className="input-element"
                type="text"
                value={city}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter the name of city"
            />
            <button className="btn-element" onClick={handleGetWeatherClick}>
                Get weather
            </button>

            {error && <p className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '160px' }}>{error}</p>}

          {weather &&
            <p className="city">
                        <FontAwesomeIcon icon={faLocationDot} beatFade style={{ color: "#63E6BE" }} /> {weather.name}
                    </p>
                 }

            {weather && (
                <div className="div-element">
                    
                    <p className="des">
                        {weather.weather[0].description} <FontAwesomeIcon icon={faCloud} style={{ color: "#ffffff" }} />
                    </p>
                    <Card 
                        wind={weather.wind.speed} 
                        temp={weather.main.temp} 
                        feel={weather.main.feels_like} 
                        humidity={weather.main.humidity} 
                    />
                </div>
            )}
        </>
    );
}

export default Weather;
