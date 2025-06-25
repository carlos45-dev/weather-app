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
        <>
        <div className="card">
            <div className="info-grid">

                <div className="wind-speed">
                    <span>< FontAwesomeIcon className='wind-icon' icon={faWind} style={{ color: "#87CEEB"}} />
                     <span className="text">Wind</span>
                     </span>
                    <span className='space'>{wind}m/s</span>
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
                    <span className="humidity-icon">💧</span>
                    <span> <span className='text'>Humidity</span> <span className='space'>{humidity}%</span></span>
                </div>

                <div className="max">
                    <span><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Max </span>
                    <span>{Math.round(max)}℃</span>
                </div>

                <div className="min">
                    <span><FontAwesomeIcon icon={faTemperatureHalf} style={{ color: "#e13748" }} /> Min </span>
                    <span>{Math.round(min)}℃</span>
                </div>

                
                <div className="direction">
                    <span>< FontAwesomeIcon className='wind-direction-icon' icon={faCompass} style={{ color: "#87CEEB" }} />
                     <span className="text"> Direction </span>
                     </span>
                    <span className='space'>{getWindDirection(deg)}°</span>
                </div>

                <div className='pressure'>
                 <span><FontAwesomeIcon className="pressure-icon" icon={faGauge} style={{ color: "#87CEEB"}} />  <span className='text'>Pressure</span> </span>
                     <span className='space'>{pressure}hPa</span>
                     </div>
            </div>
        </div>
        
        <p className='developer' style={{fontSize: "10px", fontFamily: "sans-serif", paddingTop: "6px" }}>Developed by Carlos Muleke</p>
    
        </>
    );
}

export default Card;