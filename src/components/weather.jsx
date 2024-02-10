import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Card, Divider, Input, Typography } from "@mui/joy";
import moment from "moment";
import Forecast from "./forecast";


export default function WeatherApp() {

    // State to save weather data
    const [weatherData, setWeatherData] = useState(null);
    // State to save forecast data
    const [forecastData, setForecastData] = useState(null);
    // State to save user latitude-value
    const [lat, setLat] = useState(null);
    // State to save user longitude-value
    const [lon, setLon] = useState(null);
    // State to save city from user input
    const [inputCity, setInputCity] = useState("");

    // Function to fetch weather data from users current location
    const fetchWeatherOnLocation = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/weather/?lat=${lat}&lon=${lon}&APPID=${import.meta.env.VITE_API_KEY}&units=metric`);
            setWeatherData(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    // Function to fetch weather data from city specified by user input
    const fetchWeatherData = async (inputCity) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/weather?q=${inputCity}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
            setWeatherData(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    // Function to fetch 7-day forecast data from users current location
    const fetchForecastOnLocation = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/forecast?lat=${lat}&lon=${lon}&APPID=${import.meta.env.VITE_API_KEY}&units=metric`);
            setForecastData(res.data);
            console.log(res.data); // delete after use
        } catch (err) {
            console.error(err);
        }
    }

    // Function to fetch 7-day forecast data from city specified by user input
    const fetchForecastData = async (inputCity) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/forecast?q=${inputCity}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
            setForecastData(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    // Function to get user location lat and lon values
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
    }

    // Function to handle search-button click
    const handleSearchButtonClick = () => {
        fetchWeatherData(inputCity);
        fetchForecastData(inputCity);
    }

    // Function to set user input value into inputCity-state
    const handleInputChange = (e) => {
        setInputCity(e.target.value);
    }

    // Function to handle location-button click
    const handleLocationButtonClick = () => {
        fetchWeatherOnLocation();
        fetchForecastOnLocation();
    }

    // Function to clear input field when user clicks on it after unfocusing
    const handleClearInputField = () => {
        setInputCity("");
    }

    // Function to make search on pressing "Enter" on keyboard
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchButtonClick();
        };
    }


    // useEffect to render page content based on location changes
    useEffect(() => {

        // If latitude and longitude values are not yet available, get user's location
        if (lat === null && lon === null) {
            getLocation();
        } else {
            // If no city input is provided, fetch weather and forecast based on user's location
            if (inputCity == "") {
                fetchWeatherOnLocation(lat, lon);
                fetchForecastOnLocation(lat, lon)
            } else {
                // If city input is provided, fetch weather and forecast based on city
                fetchWeatherData();
                fetchForecastData();
            }
        }
    }, [lat, lon]);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '95vh' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Input onKeyDown={handleKeyDown} value={inputCity} onChange={handleInputChange} onFocus={handleClearInputField} sx={{ width: "293px", height: '45px' }} variant="outlined" size="lg" placeholder="Search for a city..." ></Input>
                        <Button variant="outlined" color="neutral" sx={{ height: "45px", width: "70px", background: 'white' }} onClick={handleSearchButtonClick}>Search</Button>
                        <Button variant="outlined" color="neutral" sx={{ height: "45px", width: "70px", background: 'white' }} onClick={handleLocationButtonClick}>Location</Button>
                    </Box>

                    {weatherData ?
                        <Card sx={{ height: '585px', width: '400px', maxWidth: '100%' }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ height: '630px', width: "400px" }}>{forecastData && <Forecast forecastData={forecastData} />}</Card>

                </Box>
            </Box>
        </>
    );
}
