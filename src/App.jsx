



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import WeatherInfo from './WeatherInfo';
// import HistoricalWeather from './HistoricalWeather';
// import ForecastWeather from './ForecastWeather';
// import MonthlyTemperatureGraph from './MonthlyTemperatureGraph';
// import Login from './Login';
// import { auth } from './firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import Highlights from './Highlights';

// const API_KEY = 'edbb32933912451599c150403240807';
// const defaultIcon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2tODZaOmYQ7jPArUXx_26CkDKzxdDWqdzA&s';

// function App() {
//   const [user] = useAuthState(auth);
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [city, setCity] = useState('');
//   const [unit, setUnit] = useState('C');
//   const [currentDate, setCurrentDate] = useState('');
//   const [forecast, setForecast] = useState([]);
//   const [historical, setHistorical] = useState([]);
//   const [showForecast, setShowForecast] = useState(true);

//   useEffect(() => {
//     const date = new Date();
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const dayName = days[date.getDay()];
//     const formattedDate = `${dayName}, ${date.getDate()}, ${date.getFullYear()}`;
//     setCurrentDate(formattedDate);
//   }, []);

//   const fetchWeatherData = () => {
//     if (!city.trim()) {
//       setError(new Error('Please enter a valid city name.'));
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     Promise.all([
//       axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`),
//       axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`),
//       ...getPreviousDates(7).map(date =>
//         axios.get(`http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`)
//       ),
//     ])
//       .then(responses => {
//         setWeather(responses[0].data);
//         setForecast(responses[1].data.forecast.forecastday);
//         setHistorical(responses.slice(2).map(response => response.data.forecast.forecastday[0]));
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching the weather data:', error);
//         setError(error);
//         setLoading(false);
//       });
//   };

//   const getPreviousDates = days => {
//     const dates = [];
//     for (let i = 1; i <= days; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       const formattedDate = date.toISOString().split('T')[0];
//       dates.push(formattedDate);
//     }
//     return dates;
//   };

//   const toggleUnit = () => setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));

//   const toggleShowForecast = () => setShowForecast(prev => !prev);

//   const getWeatherIcon = condition => {
//     switch (condition.toLowerCase()) {
//       case 'partly cloudy':
//         return defaultIcon;
//       case 'light rain':
//         return defaultIcon;
//       default:
//         return defaultIcon;
//     }
//   };

//   const monthlyTemperatureData = [
//     { month: 'January', avgTemp: 5 },
//     { month: 'February', avgTemp: 7 },
//     { month: 'March', avgTemp: 10 },
//     { month: 'April', avgTemp: 15 },
//     { month: 'May', avgTemp: 20 },
//     { month: 'June', avgTemp: 25 },
//     { month: 'July', avgTemp: 30 },
//     { month: 'August', avgTemp: 28 },
//     { month: 'September', avgTemp: 25 },
//     { month: 'October', avgTemp: 20 },
//     { month: 'November', avgTemp: 15 },
//     { month: 'December', avgTemp: 10 },
//   ];

//   const highlightsData = [
//     { label: 'Wind Speed', value: weather?.current?.wind_kph + ' kph' || 'N/A' },
//     { label: 'Humidity', value: weather?.current?.humidity + ' %' || 'N/A' },
//     { label: 'Visibility', value: weather?.current?.vis_km + ' km' || 'N/A' },
//     { label: 'Pressure', value: weather?.current?.pressure_mb + ' mb' || 'N/A' },
//     { label: 'UV Index', value: weather?.current?.uv || 'N/A' },
//     { label: 'Feels Like', value: weather ? (unit === 'C' ? weather.current.feelslike_c + '°C' : weather.current.feelslike_f + '°F') : 'N/A' },
//     { label: 'Precipitation', value: weather?.current?.precip_mm + ' mm' || 'N/A' },
//     { label: 'Cloud Cover', value: weather?.current?.cloud + ' %' || 'N/A' },
//     { label: 'Latitude', value: weather?.location?.lat || 'N/A' },
//     { label: 'Longitude', value: weather?.location?.lon || 'N/A' },
//   ];

//   return (
//     <div className="App">
//       {user ? (
//         <>
//           <div className="date-display">{currentDate}</div>
//           <div className="search-bar">
//             <input
//               type="text"
//               value={city}
//               onChange={e => setCity(e.target.value)}
//               placeholder="Enter city name"
//               className="search-input"
//             />
//             <button className="search-button" onClick={fetchWeatherData}>
//               Search
//             </button>
//             <div className="toggle-unit">
//               <div className={`toggle ${unit === 'F' ? 'active' : ''}`} onClick={toggleUnit}>
//                 <div className="toggle-ball"></div>
//                 <span>{unit === 'C' ? 'Celsius' : 'Fahrenheit'}</span>
//               </div>
//             </div>
//             <div className="toggle-forecast">
//               <div className={`toggle ${showForecast ? 'active' : ''}`} onClick={toggleShowForecast}>
//                 <div className="toggle-ball"></div>
//                 <span>{showForecast ? 'Forecast' : 'Historical'}</span>
//               </div>
//             </div>
//           </div>

//           {loading && <div>Loading...</div>}
//           {error && <div>Error: {error.message}</div>}
//           <div className="side">
//             {weather && <WeatherInfo weather={weather} unit={unit} getWeatherIcon={getWeatherIcon} />}
//             <div className="sidepart">
//               {!showForecast && historical.length > 0 && (
//                 <HistoricalWeather historical={historical} unit={unit} getWeatherIcon={getWeatherIcon} />
//               )}
//               {showForecast && forecast.length > 0 && (
//                 <ForecastWeather forecast={forecast} unit={unit} getWeatherIcon={getWeatherIcon} />
//               )}
//             </div>
//             {weather && <MonthlyTemperatureGraph monthlyData={monthlyTemperatureData} unit={unit} />}
//           </div>
//           {weather && <Highlights highlightsData={highlightsData} />}
//         </>
//       ) : (
//         <Login />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInfo from './WeatherInfo';
import HistoricalWeather from './HistoricalWeather';
import ForecastWeather from './ForecastWeather';
import MonthlyTemperatureGraph from './MonthlyTemperatureGraph';
import Login from './Login';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Highlights from './Highlights';

const API_KEY = 'edbb32933912451599c150403240807';
const defaultIcon = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2tODZaOmYQ7jPArUXx_26CkDKzxdDWqdzA&s';

function App() {
  const [user] = useAuthState(auth);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('C');
  const [currentDate, setCurrentDate] = useState('');
  const [forecast, setForecast] = useState([]);
  const [historical, setHistorical] = useState([]);
  const [showForecast, setShowForecast] = useState(true);

  useEffect(() => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const formattedDate = `${dayName}, ${date.getDate()}, ${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const fetchWeatherData = () => {
    if (!city.trim()) {
      setError(new Error('Please enter a valid city name.'));
      return;
    }

    setLoading(true);
    setError(null);
    Promise.all([
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`),
      axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`),
      ...getPreviousDates(7).map(date =>
        axios.get(`http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`)
      ),
    ])
      .then(responses => {
        setWeather(responses[0].data);
        setForecast(responses[1].data.forecast.forecastday);
        setHistorical(responses.slice(2).map(response => response.data.forecast.forecastday[0]));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the weather data:', error);
        setError(error);
        setLoading(false);
      });
  };

  const getPreviousDates = days => {
    const dates = [];
    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    return dates;
  };

  const toggleUnit = () => setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));

  const toggleShowForecast = () => setShowForecast(prev => !prev);

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
    }).catch(error => {
      console.error('Error signing out:', error);
    });
  };

  const getWeatherIcon = condition => {
    switch (condition.toLowerCase()) {
      case 'partly cloudy':
        return defaultIcon;
      case 'light rain':
        return defaultIcon;
      default:
        return defaultIcon;
    }
  };

  const monthlyTemperatureData = [
    { month: 'January', avgTemp: 5 },
    { month: 'February', avgTemp: 7 },
    { month: 'March', avgTemp: 10 },
    { month: 'April', avgTemp: 15 },
    { month: 'May', avgTemp: 20 },
    { month: 'June', avgTemp: 25 },
    { month: 'July', avgTemp: 30 },
    { month: 'August', avgTemp: 28 },
    { month: 'September', avgTemp: 25 },
    { month: 'October', avgTemp: 20 },
    { month: 'November', avgTemp: 15 },
    { month: 'December', avgTemp: 10 },
  ];

  const highlightsData = [
    { label: 'Wind Speed', value: weather?.current?.wind_kph + ' kph' || 'N/A' },
    { label: 'Humidity', value: weather?.current?.humidity + ' %' || 'N/A' },
    { label: 'Visibility', value: weather?.current?.vis_km + ' km' || 'N/A' },
    { label: 'Pressure', value: weather?.current?.pressure_mb + ' mb' || 'N/A' },
    { label: 'UV Index', value: weather?.current?.uv || 'N/A' },
    { label: 'Feels Like', value: weather ? (unit === 'C' ? weather.current.feelslike_c + '°C' : weather.current.feelslike_f + '°F') : 'N/A' },
    { label: 'Precipitation', value: weather?.current?.precip_mm + ' mm' || 'N/A' },
    { label: 'Cloud Cover', value: weather?.current?.cloud + ' %' || 'N/A' },
    { label: 'Latitude', value: weather?.location?.lat || 'N/A' },
    { label: 'Longitude', value: weather?.location?.lon || 'N/A' },
  ];

  return (
    <div className="App">
      {user ? (
        <>
          <div className="date-display">{currentDate}</div>
          <div className="search-bar">
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter city name"
              className="search-input"
            />
            <button className="search-button" onClick={fetchWeatherData}>
              Search
            </button>
            <div className="toggle-unit">
              <div className={`toggle ${unit === 'F' ? 'active' : ''}`} onClick={toggleUnit}>
                <div className="toggle-ball"></div>
                <span>{unit === 'C' ? 'Celsius' : 'Fahrenheit'}</span>
              </div>
            </div>
            <div className="toggle-forecast">
              <div className={`toggle ${showForecast ? 'active' : ''}`} onClick={toggleShowForecast}>
                <div className="toggle-ball"></div>
                <span>{showForecast ? 'Forecast' : 'Historical'}</span>
              </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          <div className="side">
            {weather && <WeatherInfo weather={weather} unit={unit} getWeatherIcon={getWeatherIcon} />}
            <div className="sidepart">
              {!showForecast && historical.length > 0 && (
                <HistoricalWeather historical={historical} unit={unit} getWeatherIcon={getWeatherIcon} />
              )}
              {showForecast && forecast.length > 0 && (
                <ForecastWeather forecast={forecast} unit={unit} getWeatherIcon={getWeatherIcon} />
              )}
            </div>
            {weather && <MonthlyTemperatureGraph monthlyData={monthlyTemperatureData} unit={unit} />}
          </div>
          {weather && <Highlights highlightsData={highlightsData} />}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
