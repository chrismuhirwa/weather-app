import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
const WeeklyForecast = ({ name }) => {
  console.log(name);
  const [data,setData] = useState('')
  useEffect(() => {
    const fetchfunction = async () => {
      const url = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=b9828b8dc0ac51bcf19d63e213e03c36`);
      const data = await url.json();
       setData(data.list.filter(day=>day.dt_txt.includes("12:00")));
       console.log(data.list.filter(day=>day.dt_txt.includes("12:00")))
    };
    fetchfunction();
    
   
  },[name]);
  return (
    <div className='card-container'>
        {data && data.map((day,idx) => {
            return(
                <div>
                    <p className='date'>{day.dt_txt}</p>
                    <p className='temperature'>Temperature: {Math.floor((day.main.feels_like-273.15)*(9/5)+32)}°F</p>
                </div>
            )
       } )};
      
    </div>
  );
};
export default WeeklyForecast;