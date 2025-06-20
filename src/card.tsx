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
        <div className="card-wrapper">
            <div className="card">
                <p><FontAwesomeIcon icon={faWind} style={{ color: "#87CEEB" }} /> Wind speed</p>
                <p>{wind} m/s</p>
            </div>
            <div className="card">
                <p><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Temperature</p>
                <p>{temp}°C</p>
            </div>
            <div className="card">
                <p><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Feels like</p>
                <p>{feel}°C</p>
            </div>
            <div className="card">
                <p>💧 Humidity</p>
                <p>{humidity}%</p>
            </div>
        </div>
    );
}

export default Card;