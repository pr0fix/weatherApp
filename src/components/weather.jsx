import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Divider, Typography } from "@mui/joy";
import moment from "moment";
export default function WeatherApp() {

    const [weatherData, setWeatherData] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/weather/?lat=${lat}&lon=${long}&APPID=${import.meta.env.VITE_API_KEY}&units=metric`);
            setWeatherData(res.data)
            console.log(res.data)
        } catch (err) {
            console.error(err);
        }
    }

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
    }


    useEffect(() => {
        if (lat === null && long === null) {
            getLocation();
        } else {
            fetchData(lat, long);
        }
    }, [lat, long])

    return (
        <>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', flexDirection:'column'}}>
            
        {weatherData ?
            <Card sx={{width:'400px', maxWidth:'100%'}}>
                <Box>
                    <Typography color="neutral" level="h2">{moment().format('dddd')}, {moment().format('LL')}</Typography>
                    <Divider inset="context" sx={{my: 2}}></Divider>
                    
                    <Typography color='neutral' level="h4">Current weather in {weatherData && (weatherData.name)}</Typography>
                    <Typography color="neutral" level="body-lg">{weatherData && (weatherData.weather[0].main)}</Typography>
                    <Typography color="neutral" level="body-lg">Temperature: {weatherData && (weatherData.main.temp.toFixed(0))} {'\u00b0'}C</Typography>
                    <Typography color="neutral" level="body-lg">Feels like: {weatherData && (weatherData.main.feels_like.toFixed(0))} {'\u00b0'}C</Typography>
                    <Typography color="neutral" level="body-lg">Wind: {weatherData && (weatherData.wind.speed.toFixed(0))} m/s</Typography>
                        <img style={{width:'20%'}}
                        src={`https://openweathermap.org/img/wn/${weatherData && (weatherData.weather[0].icon)}@2x.png`}
                        alt="weather icon"
                        >
                        </img>
                    
                </Box>
            </Card>
        : <p>Loading...</p>}
        </Box>
        </>
    );
}
