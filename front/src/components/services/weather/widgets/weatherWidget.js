import React, { useEffect, useState } from 'react'
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FlareIcon from '@material-ui/icons/Flare';
import Grid from '@material-ui/core/Grid'
import '../weather.css'

export default function WeatherWidget({inputs}) {

  const [data, setData] = useState({})
  const [isDataSet, SetIsDataSet] = useState(false)
  
  useEffect(() => {
    getWeather()
  }, [])

  const getWeather = async () => {
    const APIKey = "3cf1991a83eb3dfa8ca900216abe59ce"
    const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputs.city},${inputs.country}&appid=${APIKey}&units=metric`)
    const jsonData = await result.json();
    console.log(jsonData)
    setData(jsonData)
    SetIsDataSet(true)
  }
  
  const Weather = () => {
    if (!data.main && !data.weather) {
      return (
        <div className="weatherWidgetDataContainer">
          unknown city or unavailible data
        </div>
      )
    }

    return (
      <>
        <div className="weatherWidgetDataContainer">
          <p className="weatherWidgetData">
            <WhatshotIcon fontSize='small' style={{marginRight: '5px'}} />
            temperature:
          </p>
          {data.main.temp}
        </div>
        <div className="weatherWidgetDataContainer">
          <p className="weatherWidgetData">
            <WhatshotIcon fontSize='small' style={{marginRight: '5px'}} />
            feels like:
          </p>
          {data.main.feels_like}
        </div>
        <div className="weatherWidgetDataContainer">
          <p className="weatherWidgetData">
            <FlareIcon fontSize='small' style={{marginRight: '5px'}} />
            weather:
          </p>
          {data.weather[0].description}
        </div>
      </>
    )
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div className="weatherWidget">
        <p className="weatherWidgetName"> weather in {inputs.city} ({inputs.country}) </p>
        { isDataSet && <Weather />  }
      </div>
    </Grid>
  )
}