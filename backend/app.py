from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests

app = Flask(__name__)
CORS(app) 

API_KEY = "YOUR API KEY"
WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?"
AQI_URL = "http://api.openweathermap.org/data/2.5/air_pollution?" 

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    print("city:",city)
    
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    weather_response = requests.get(f"{WEATHER_URL}q={city}&appid={API_KEY}")
    if weather_response.status_code != 200:
        return jsonify({"error": "City not found"}), 404
    
    

    weather_data = weather_response.json()
    print("weather_data:\n", weather_data,"\n")
    lat, lon = weather_data["coord"]["lat"], weather_data["coord"]["lon"]
   # print("lat:",lat,"\tlon",lon)

    aqi_response = requests.get(f"{AQI_URL}lat={lat}&lon={lon}&appid={API_KEY}")
    aqi_data = aqi_response.json()
    print("aqi_data:\n", aqi_data,"\n")

    Data = ({
        "city": city,
        "lat": lat,
        "lon": lon,
        "temperature": round(weather_data["main"]["temp"] - 273.15, 2),  # Kelvin to Celsius
        "feels_like": round(weather_data["main"]["feels_like"] - 273.15, 2),  # Kelvin to Celsius
        "wind_speed": weather_data["wind"]["speed"],
        "pressure": weather_data["main"]["pressure"],
        "humidity": weather_data["main"]["humidity"],
        "description": weather_data["weather"][0]["description"].capitalize(),
        "icon_code": weather_data["weather"][0]["icon"],
        "aqi": aqi_data["list"][0]["main"]["aqi"],
        "pollutants": aqi_data["list"][0]["components"]
    })
    json_data = jsonify(Data)
    print(Data)
    return json_data

if __name__ == '__main__':
    app.run(port=5000, debug=True)
