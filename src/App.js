import React, { useState } from 'react'
import axios from 'axios'
// reactstrap
import { Container, Input, Button, InputGroup } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// react-icons
import { GrLocation } from 'react-icons/gr'
import { BsFillSunFill } from 'react-icons/bs'
import { WiHumidity } from 'react-icons/wi'
import { TiWeatherCloudy } from 'react-icons/ti'


const App = () => {

  const [location, setLocation] = useState("")
  const [data, setData] = useState({})

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=97b38540f5a118d8aa900a70e032015f`
  // API CALL
  const searchLocation = () => {
    if (location === '') {
      return alert("City name missing")
    }
    else {
      axios.get(url)
        .then(response => {
          setData(response.data)
          
        })
      setLocation("")
    }
  }


  return (
    <Container fluid className='App'>
      <InputGroup>
        <Input
          placeholder='Enter city'
          value={location}
          onChange={e => setLocation(e.target.value)}
          type="text"
          className="mt-2 search"
          style={{ borderRadius: "15px" }}
        />
        <Button color='primary' 
               
                onClick={searchLocation} 
                className="btn btn-primary mx-2 my-2 " 
                style={{borderRadius: '15px',padding: 'auto'  }}>
                  Check
        </Button>
      </InputGroup>
      <Container className='row mt-5 text-center'>
        <Container className='col-md-6'>
          <div className="top">
            <h2 className="temprature">
              {data.main ? <p><BsFillSunFill style={{ color: 'yellow' }} /> {data.main.temp.toFixed()}°F </p> : ''}
            </h2>
            <h5 className="temprature">

              {data.main ? <p><GrLocation style={{ color: "green" }} />  {data.name}, {data.sys.country}</p> : ''}
              {data.main ? <p><WiHumidity />{data.main.humidity}% humidity</p> : ''}
            </h5>
          </div>
        </Container>
        <Container className='col-md-6'>
          <div className="top">
            <div className="speed">
              {data.main ? <p>Wind Speed {data.wind?.speed} km/h</p> : ''}
            </div>
            <div className="temprature">
              {data.main ? <p>Feels like {data.main.feels_like.toFixed()}°F </p> : ''}
            </div>
          </div>
        </Container>
      </Container>
      <Container className='col-md-2 text-center side'>
        {data.weather ? <p><TiWeatherCloudy /> {data.weather[0].main}</p> : null}
      </Container>
    </Container>
  )
}

export default App