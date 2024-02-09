import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Card, Divider, Input, Typography } from "@mui/joy";
import moment from "moment";

export default function WeatherApp() {

    const [weatherData, setWeatherData] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [inputCity, setInputCity] = useState("");

    const fetchWeatherOnLocation = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/weather/?lat=${lat}&lon=${lon}&APPID=${import.meta.env.VITE_API_KEY}&units=metric`);
            setWeatherData(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchWeatherData = async (inputCity) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/weather?q=${inputCity}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
            setWeatherData(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
    }

    const handleButtonClick = () => {
        fetchWeatherData(inputCity);
    }

    const handleInputChange = (e) => {
        setInputCity(e.target.value);
    }

    useEffect(() => {
        if (lat === null && lon === null) {
            getLocation();
        } else {
            if (inputCity == "") {
                fetchWeatherOnLocation(lat, lon);
            } else {
                fetchWeatherData();
            }
        }
    }, [lat, lon]);

    return (
        <>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Input value={inputCity} onChange={handleInputChange} sx={{ width: "363px" }} variant="outlined" size="lg" placeholder="Search for a city..." ></Input>
                    <Button variant="outlined" color="neutral" sx={{ height: "45px", width: "70px" }} onClick={handleButtonClick}>Search</Button>
                </Box>

                {weatherData ?
                    <Card sx={{ width: '400px', maxWidth: '100%' }}>
                        <Box>
                            <Typography color="neutral" level="h2">{moment().format('dddd')}, {moment().format('LL')}</Typography>
                            <Divider inset="context" sx={{ my: 2 }}></Divider>
                            <Typography color='neutral' level="h4">Current weather in {weatherData && (weatherData.name)}</Typography>
                            <Typography color="neutral" level="body-lg">{weatherData && (weatherData.weather[0].main)}</Typography>
                            <Typography color="neutral" level="body-lg">Temperature: {weatherData && (weatherData.main.temp.toFixed(0))} {'\u00b0'}C</Typography>
                            <Typography color="neutral" level="body-lg">Feels like: {weatherData && (weatherData.main.feels_like.toFixed(0))} {'\u00b0'}C</Typography>
                            <Typography color="neutral" level="body-lg">Wind: {weatherData && (weatherData.wind.speed.toFixed(0))} m/s</Typography>
                            <img style={{ width: '20%' }}
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
