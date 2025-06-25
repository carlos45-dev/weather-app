import { useState, useEffect, } from "react";
import Card from "./card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faCloud } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';


interface WeatherData {
  name: string;
  weather: {
    description: string;
     
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
   temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

function Weather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherByCity = async (city: string) => {
        const apiKey = `257a5e2dac441e5d1662c41efc4a5a86`;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("City not found");
            const data: WeatherData = await response.json();
            setWeather(data);
            setCity(data.name);
            setError(null);
            setCity("");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
            setWeather(null);
        }
    };

    const fetchCityName = async (latitude: number, longitude: number) => {
        const apiKey = `257a5e2dac441e5d1662c41efc4a5a86`;
        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Could not fetch city name");
            const data = await response.json();
            if (data.length > 0) {
                fetchWeatherByCity(data[0].name);
            } else {
                setError("City not found");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    // Fetch weather on initial render for the user's location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchCityName(latitude, longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error.message);
                    setError("Unable to get location. Please enter a city manually.");
                }
            );
        } else {
            setError("Geolocation not supported. Please enter a city manually.");
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleGetWeatherClick = () => {
        fetchWeatherByCity(city);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleGetWeatherClick();
        }
    };

    return (
        <>
            <h1>Weather <FontAwesomeIcon icon={faCloud} style={{ color: "#ffffff" }} /></h1>
            <div className="search-wrapper">
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
            </div>

            {error && <p className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '160px' }}>{error}</p>}

          {weather &&
          <div className="city">
            <p className="city-name">{weather.name}</p>

            <div className="city-icon">
                        <p>
            <FontAwesomeIcon
                icon={faLocationArrow}
                beatFade
                style={{
                color: "#003366",
                textShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                }}
            />{" "}
            <FontAwesomeIcon
                icon={faEllipsis}
                style={{
                color: "#003366",
                textShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                }}
            />
            </p>

            </div>        
            </div>
                 }

            {weather && (
                <>
                    <div className="div-element">

                        <p className="temp">
                            {Math.round(weather.main.temp)}°
                        </p>
                        
                        <p className="des">
                            {weather.weather[0].description}
                        </p>
                        <Card 
                            wind={weather.wind.speed} 
                            temp={weather.main.temp} 
                            feel={weather.main.feels_like} 
                            humidity={weather.main.humidity} 
                            deg={weather.wind.deg}
                            pressure={weather.main.pressure}
                            max={weather.main.temp_max}
                            min={weather.main.temp_min}
                        />
                    </div>
                    <p className='developer'>
                        Developed by Carlos Muleke
                    </p>
                </>
            )}
        </>
    );
}

export default Weather;
