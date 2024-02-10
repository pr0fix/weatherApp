# Weather App

This application provides current weather information and a 7-day forecast based on the user's location or a specified city.

## Features
- Fetches weather data from the OpenWeatherMap API.
- Allows users to search for weather information based on a city name.
- Provides current weather conditions including temperature, description and wind speed.
- Displays a 7-day forecast including weather icons, description and temperature ranges.

## Technologies used
- React
- Material-UI
- axios
- react-accessible-accordion

## OpenWeatherMap API
The application relies on an API provided by OpenWeatherMap.org, accessible at: 
[Weather API](https://openweathermap.org/api)

## Setup Instructions

### Prerequisites
- Node.js & npm installed

### Installation
To set up the project, follow these steps (NOTE: :

```bash
# Clone the repository
git clone https://github.com/pr0fix/weatherApp.git

# Navigate to the project directory
cd weatherApp

# Install dependencies
npm install

# Set up environment variables
Create a `.env` file in the root directory and add the following:

VITE_API_URL=https://api.openweathermap.org/data/2.5
VITE_API_KEY={your_openweathermap_api_key}

# Start the development server
npm run dev
