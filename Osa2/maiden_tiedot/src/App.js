import { useState, useEffect } from 'react'
import Filter from './components/filter'
import Countries from './components/countries'
import axios from 'axios'

function App() {
  //Apista ladattavat maidentiedot tallennetaan tähän
  const [country, setCountries] = useState([])

  //Filtterin tiedot tallennetaan tähän
  const [filters, setFilter] = useState()

  //useEffect hakee maiden tiedot
  useEffect(() => {
    //console.log('effect alkaa')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(Response => {
        //console.log('Lupaus täytetty')
        setCountries(Response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  //console.log('filterin tila', filters)
  //määrittelemättömän filterin kanssa tulee ongelmia, joten tilanteessa undefined sille annetaan tyhjä arvo
  const lowerCaseFilter = filters === undefined ? '' : filters.toLowerCase()
  // console.log('pienetkirjaimet tarkastus filtterille:', lowerCaseFilter)

  const filterCountries = filters === '' ? filters : country.filter(s =>
    s.name.common.toLowerCase().includes(lowerCaseFilter))
  //console.log('Tarkastus filterCountries', filterCountries)

  //nämä console logit tarkastusta varten, mutta aiheuttavat virheitä.
  //console.log('Suodattimen maiden määrä', filterCountries.map(county => <div>{county.name.common}</div>).length)
  //console.log('filterin pituus', filters.length)

  //Api avain säätietoihin
  const api_key = process.env.REACT_APP_API_KEY
  //console.log(api_key)

  //useEffect hakee tänne säätiedot
  const [wheather, setWheather] = useState([])
  const [wheatherToTown, setWheatherToTown] = useState()
  const [downloadWheather, setDownloadWheather] = useState(true)
  const [downloadWheather2, setDownloadWheather2] = useState(true)

  //Säätietojen hakeminen
  useEffect(() => {
    //console.log('effect alkaa')
    //console.log(wheatherToTown.length)
    if (wheatherToTown === '' || wheatherToTown === undefined) {
      return (
        console.log('Ei kaupunkia', downloadWheather, '-1 2-', downloadWheather2)
      )
    }
    else if (downloadWheather === true && downloadWheather2 === true) {
      const address = 'https://api.openweathermap.org/data/2.5/weather?q=' + wheatherToTown + '&appid=' + api_key
      console.log('lataus osoite säälle: ', address)
      axios
        .get(address)
        .then(Response => {
          //console.log('Lupaus täytetty')
          setWheather(Response.data)
        })
      setDownloadWheather(false)
      setDownloadWheather2(false)
      console.log('Kaupungin säätiedot haettu', downloadWheather, '-1 2-', downloadWheather2)
    }
    else {
      console.log('tiedot ladattu', wheatherToTown, downloadWheather, '-1 2-', downloadWheather2)
    }
  })
  //console.log('säätiedot:', wheather)

  const Weather = () => {
    if (wheather.length === 0 || wheather === undefined) {
      return (
        <div>Wheather is not avaible</div>
      )
    }
    else {
      let image = 'http://openweathermap.org/img/wn/' + wheather.weather[0].icon + '@2x.png'
      //console.log(image)
      return (
        //console.log('json:', wheather.weather[0].description)
        <div> Temperature is {wheather.main.temp - 273.15} Celcius <br />
          Wind {wheather.wind.speed} m/s<br />
          Wheather today: {wheather.weather[0].description}<br />
          <img src={image} ></img ></div>
      )
    }

  }

  return (
    <div>
      <header>
        <h1>Countries information</h1>
      </header>
      <body>
        <Filter filters={filters} handleFilterChange={handleFilterChange} />
        <ul>
          <Countries filterCountries={filterCountries} filters={filters} setFilter={setFilter}
            setWheatherToTown={setWheatherToTown} wheatherToTown={wheatherToTown}
            wheather={wheather} setDownloadWheather={setDownloadWheather}
            setDownloadWheather2={setDownloadWheather2} Weather={Weather} />
        </ul>
      </body>
    </div>
  );
}

export default App;
