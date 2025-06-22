import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
    wind: number;
    temp: number;
    feel: number;
    humidity: number;
}

function Card({ wind, temp, feel, humidity }: CardProps) {
    return (
        <div className="card">
            <div className="info-grid">
                <div className="wind-spead">
                    <span><FontAwesomeIcon icon={faWind} style={{ color: "#87CEEB" }} /> Wind speed{wind} m/s</span>
                </div>
                <div className="temperature">
                    <span><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Temperature</span>
                    <span>{temp}</span>
                </div>
                <div className="feels_like">
                    <span><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Feels like</span>
                    <span>{feel}°C</span>
                </div>
                <div className="humidity">
                    <span>💧 Humidity</span>
                    <span>{humidity}%</span>
                </div>
            </div>
        </div>
    );
}

export default Card;