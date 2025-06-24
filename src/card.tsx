import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHalf, faWind ,faGauge,faCompass  } from '@fortawesome/free-solid-svg-icons';
import getWindDirection from './getWinddirection';


interface CardProps {
    wind: number;
    temp: number;
    feel: number;
    humidity: number;
    pressure: number;
    deg: number
    max: number;
    min: number;
}

function Card({ wind, temp, feel, humidity, pressure,deg,max,min }: CardProps) {
    return (
        <div className="card">
            <div className="info-grid">
                <div className="wind-spead">
                    <span><FontAwesomeIcon icon={faWind} style={{ color: "#87CEEB" }} /> Wind speed {wind}m/s</span>
                </div>

                <div className="temperature">
                    <span><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Temperature </span>
                    <span>{Math.round(temp)}℃</span>
                </div>

                <div className="feels_like">
                    <span><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Feels like </span>
                    <span>{Math.round(feel)}℃</span>
                </div>

                <div className="humidity">
                    <span>💧 Humidity </span>
                    <span>{humidity}%</span>
                </div>

                <div className="direction">
                    <span><FontAwesomeIcon icon={faCompass} style={{ color: "#87CEEB", fontSize: "20px"}} /> Wind direction </span>
                    <span>{getWindDirection(deg)}°</span>
                </div>
                
                <div className="max">
                    <span><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Max </span>
                    <span>{Math.round(max)}℃</span>
                </div>

                <div className="min">
                    <span><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Min </span>
                    <span>{Math.round(min)}℃</span>
                </div>

                <div className='pressure'>
                 <span><FontAwesomeIcon icon={faGauge} style={{ color: "#74C0FC", fontSize: "18px"}} />  Pressure </span>
                     <span>{pressure}hPa</span>
                     </div>
            </div>
        </div>
    );
}

export default Card;