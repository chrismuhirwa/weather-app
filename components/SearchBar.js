import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import WeeklyForecast from './weeklyweather';

const SearchBar = () => {
  const [weatherData, setWeatherData] = useState({
    weather: "",
    cityName: "",
    description: "",
    country: "",
    visibility: "",
    humidity: "",
    wind: "",
    feels_like: "",
    temp_min: "",
    temp_max: "",
   
    
  });
  const[searchTerm,setSearchTerm] = useState("");

  // const getDayName = (date) => {
  //   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   const dayIndex = date.getDay();
  //   return days[dayIndex];
  // };

  const fetchWeatherApi = async (event) => {
    event.preventDefault();
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=b9828b8dc0ac51bcf19d63e213e03c36`;
    const response = await fetch(url);
    const responseData = await response.json();

    if (responseData.weather && responseData.weather.length > 0) {
      setWeatherData({
        ...weatherData,
        weather: responseData.weather[0].id,
        cityName: responseData.name,
        description: responseData.weather[0].description,
        country: responseData.sys.country,
        visibility: responseData.visibility,
        humidity: responseData.main.humidity,
        wind: responseData.wind.speed,
        feels_like:`${Math.floor((responseData.main.feels_like-273.15)*(9/5)+32)}°F` ,
        temp_min: responseData.main.temp_min,
        temp_max:`${Math.floor((responseData.main.temp_max-273.15)*(9/5)+32)}°F`,
      });

    }
  }

  const handleInputChange = (event) => {
    setSearchTerm(
     event.target.value,
    );
  };

  return (
    <div>
      <Form className="d-flex" onSubmit={fetchWeatherApi}>
        <Form.Control
          type="search"
          placeholder="Enter City"
          className="me-2"
          aria-label="Search"
          onChange={handleInputChange}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>

      {weatherData.cityName && (

        <div className='card'>
          <h2 className='city-name'>{weatherData.cityName}</h2>
          <div className='temperature'>Max Temp: {weatherData.temp_max}</div>
        </div>
        // <Card className='card'>
        //   <Card.Body>
        //     <Card.Title><h2>{weatherData.cityName}</h2></Card.Title>
                     
        //     <Card.Subtitle className="mb-2 text-muted">
        //       {weatherData.description}
        //     </Card.Subtitle>
        //     <Card.Text>
        //       <div>Wind: {weatherData.wind}</div>
        //     <div>Feels Like: {weatherData.feels_like}</div>
        //      <div className='temperature'> Max Temp: {weatherData.temp_max}</div>
        //      <div>WeeklyForecast:</div> 
        //      <WeeklyForecast name={weatherData.cityName}/> 
        //     </Card.Text>
        //   </Card.Body>
        // </Card>
      )}
    </div>
  );
};

export default SearchBar;
