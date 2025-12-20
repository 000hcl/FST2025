import { useState, useEffect } from 'react'
import axios from 'axios'
const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY


const getWeather = (country) => {
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]
    const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,daily,minutely&appid=${WEATHER_KEY}`)
    return request.then(response => response.data)

}

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        getWeather(country).then( data =>
            setWeather(data)
        )
    },[])

    if (!weather) {
        return null
    }

    console.log(weather);
    

    const icon = weather.current.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            Temperature: {weather.current.temp} celsius
            <br />
            <img src={iconUrl}/>
            <br />
            Wind: {weather.current.wind_speed} m/s
        </div>
    )
}

export default Weather