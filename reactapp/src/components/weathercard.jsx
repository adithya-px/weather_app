import React from "react";
import "./weathercard.css";

export default function WeatherCard({ data }) {
  const getAQIRating = (aqi) => {
    if (aqi === 1) return { text: "Good 😊", className: "good" };
    if (aqi === 2) return { text: "Moderate 😐", className: "moderate" };
    if (aqi === 3) return { text: "Unhealthy 🤧", className: "unhealthy" };
    if (aqi === 4) return { text: "Very Unhealthy 😷", className: "very-unhealthy" };
    return { text: "Hazardous ☠️", className: "hazardous" };
  };

   const pollutantsInfo = [
  { key: 'so2', name: 'SO₂', label: 'Sulfur Dioxide', icon: 'fa-burn', levels: [20, 80, 250, 350] },
  { key: 'no2', name: 'NO₂', label: 'Nitrogen Dioxide', icon: 'fa-industry', levels: [40, 70, 150, 200] },
  { key: 'pm10', name: 'PM10', label: 'Coarse Particles', icon: 'fa-cloud', levels: [20, 50, 100, 200] },
  { key: 'pm2_5', name: 'PM2.5', label: 'Fine Particles', icon: 'fa-cloud', levels: [10, 25, 50, 75] },
  { key: 'o3', name: 'O₃', label: 'Ozone', icon: 'fa-sun', levels: [60, 100, 140, 180] },
  { key: 'co', name: 'CO', label: 'Carbon Monoxide', icon: 'fa-smog', levels: [4400, 9400, 12400, 15400] },
 ];


  const getColorClass = (value, thresholds) => {
  if (value < thresholds[0]) return "safe";
  if (value < thresholds[1]) return "moderate";
  if (value < thresholds[2]) return "unhealthy";
  if (value < thresholds[3]) return "very-unhealthy";
  return "hazardous";
};

  const pollutants = data.pollutants || {};
  const aqiInfo = getAQIRating(data.aqi);

  return (
    <>
    <div className="container mt-4">
      <div className="glass-card text-white p-4 rounded">
        <h2 className="text-center mb-4">{data.city.toUpperCase()}</h2>

        
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="sub glass p-3">
               <img
                src={`https://openweathermap.org/img/wn/${data.icon_code}@2x.png`}
                alt={data.description}
                width="42"
                height="42"
                style={{ filter: "drop-shadow(0 0 5px" }}
              />
              <p><strong>Description:</strong> {data.description}</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="sub glass p-3">
              <i className="fas fa-temperature-high fa-2x mb-2 text-info" style={{ color: "#f9941f" }}></i>
              <p><strong>Temprature:</strong> {data.temperature}°C</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="sub glass p-3">
              <i className="fas fa-thermometer-half fa-2x mb-2 text-info"></i>
              <p><strong>Feels Like:</strong> {data.feels_like}°C</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="sub glass p-3">
              <i className="fas fa-tachometer-alt fa-2x mb-2 text-info"></i>
              <p><strong>Pressure:</strong> {data.pressure} hPa</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="sub glass p-3">
              <i className="fas fa-tint fa-2x mb-2 text-info"></i>
              <p><strong>Humidity:</strong> {data.humidity}%</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="sub glass p-3">
              <i className="fas fa-wind fa-2x mb-2 text-info"></i>
              <p><strong>Wind:</strong> {data.wind_speed} m/s</p>
            </div>
          </div>
        </div>        
      </div>
    </div>
    <div className="container mb-4">
      <div className="glass-card text-white p-4 rounded">
        <h4 className="text-center mb-3">🧪 AQI Pollutant Breakdown</h4>
        <div className="row text-center">
           <div className={`aqi-box text-center p-3 mb-3 ${aqiInfo.className}`}>
          <h5 className="mb-0"> {aqiInfo.text}</h5>
        </div>
          {pollutantsInfo.map((p) => {
            const value = pollutants[p.key];
            const levelClass = getColorClass(value, p.levels);


            return (
              <div className="col-md-3 col-6 mb-3 mb-2 flex-row-reverse justify-content-center " key={p.key}>
                <div className={`sub glass pollutant-card ${levelClass}`} title={p.label}>
                  <i className={`fas ${p.icon} fa-lg mb-1`}></i>
                  <div><strong>{p.name}</strong></div>
                  <div>{value != null ? value.toFixed(2) : 'N/A'} μg/m³</div>
                </div>
              </div>
            );

          })}
        </div>
         <div className="aqi-legend mt-3">
          <span className="legend-item safe">Good</span>
          <span className="legend-item moderate">Fair</span>
          <span className="legend-item unhealthy">Moderate</span>
          <span className="legend-item very-unhealthy">Poor</span>
          <span className="legend-item hazardous">Very Poor</span>
        </div>
      </div>
    </div>
    </>      
  );
}
