import { useState } from 'react'
import Header from './components/header'
import Search from './components/search'
import WeatherCard from './components/weathercard'

import './App.css'

function App() {

  const [data, setData] = useState(null);

  const fetchWeather = (city) => {
    fetch(`http://localhost:5000/weather?city=${city}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => alert("Failed to fetch data"));
  };
  return (
    <>
    <header>
      <Header/>
    </header>
    <div>
      <Search onSearch={fetchWeather} />
      {data && <WeatherCard data={data} />}
      {console.log(data)}
    </div>
     </>
  )
}

export default App
