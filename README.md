# Weather App

The Weather App is a web application that provides users with current weather information and a 7-day forecast based on their location or a specified city.

## Features

- **Real-time Weather Data**: Fetches weather data from the OpenWeatherMap API, providing accurate and up-to-date information.
- **City-based Search**: Allows users to search for weather information based on the name of a city.
- **Detailed Weather Information**: Provides current weather conditions including temperature, description, and wind speed.
- **7-Day Forecast**: Displays a 7-day forecast, complete with weather icons, descriptions, and temperature ranges.

## Technologies Used

- React
- Emotion
- Material-UI
- axios
- moment
- react-accessible-accordion

## OpenWeatherMap API

The Weather App relies on the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You'll need to sign up for an API key to use the service.

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js & npm

### Installation

Follow these steps to set up the project:

1. Clone the repository:

    ```bash
    git clone https://github.com/pr0fix/weatherApp.git
    ```

2. Navigate to the project directory:

    ```bash
    cd weatherApp
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:
   
   Create a `.env` file in the root directory and add the following:

    ```
    VITE_API_URL=https://api.openweathermap.org/data/2.5
    VITE_API_KEY={your_openweathermap_api_key}
    ```

    Replace `{your_openweathermap_api_key}` with your actual API key.

5. Start the development server:

    ```bash
    npm run dev
    ```

## Feedback and Contributions

Feedback and contributions are welcome! If you encounter any issues or have suggestions for improvement, feel free to [open an issue](https://github.com/pr0fix/weatherApp/issues) or submit a pull request.
