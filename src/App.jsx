import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const inputVal = useRef();

  const addCity = (event) => {
    event.preventDefault();
    const city = inputVal.current.value.trim();
    if (city && !cities.includes(city)) {
      setCities([city, ...cities]);
    }
    inputVal.current.value = "";
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = {};
        for (const city of cities) {
          const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=332a719dddcf4d4db70171238241406&q=${city}&aqi=no`)
          data[city] = res.data;
        }
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (cities.length > 0) {
      fetchWeatherData();
    }
  }, [cities]);

  return (
    <>
      <div className="">
        <h1 className="text-3xl text-center mt-2 font-extrabold">Weather App</h1>
        <form onSubmit={addCity}>
          <div className="w-[50%] mx-auto mt-[3%]">
            <input
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
              type="text"
              aria-label="City Name"
              placeholder="City Name"
              ref={inputVal}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg mt-5"
            >
              Show Weather
            </button>
          </div>
        </form>
      </div>

      {cities.length > 0 ? (
        Object.keys(weatherData).map((city) => (
          <div key={city} className="bg-white border-gray-800 shadow-lg ring-gray-700 ring-opacity-50 w-[50%] mx-auto mt-5 rounded-lg p-[1rem] mb-5">
            <div className="mb-5">
              <h1 className="text-2xl">{weatherData[city].location.name}</h1>
              <p className="text-gray-500">{weatherData[city].current.last_updated}, {weatherData[city].location.country}</p>
              <div className="mt-5 flex justify-between items-center mx-5 pb-[1rem]">
                <h2 className="text-4xl md:text-7xl lg:text-8xl">{weatherData[city].current.temp_c}°C</h2>
                <img
                  className="w-[10rem]"
                  src={weatherData[city].current.condition.icon}
                  alt={weatherData[city].current.condition.text}
                />
              </div>
              <p className="text-1xl">{weatherData[city].current.condition.text}</p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center">Please Search City</h1>
      )}


    </>
  );
};

export default App;
