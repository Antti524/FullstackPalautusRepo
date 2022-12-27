import { useState, useEffect } from 'react'
import Filter from './components/filter'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import personsService from './services/personsService'
import Notification from './components/notifications'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Veikko Mainio', number: '+358-401231231' }
  ])
  //nimikentän useState  ja välissä place holder
  const [newName, setNewName] = useState(
    'write name here'
  )
  // puhelinnumeron useState ja välissä place holder numerolle
  const [newNumber, setNewNumber] = useState(
    '+123 456789'
  )
  // suodattimen useState 
  const [filterAll, setFilterAll] = useState()
  // virheilmoitukset notifications componentille
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [errorColor, setErrorColor] = useState('notification')

  //useEffect hakee db.json tiedot. Jos Veikko näkyy listalla, niin serveri ei ole päällä!
  useEffect(() => {
    console.log('effect alkaa')
    personsService
      .getPersons()
      .then(Response => {
        console.log('Lupaus täytetty')
        setPersons(Response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('I see you click!', event.target)
    console.log(persons)
    console.log('lisättävä henkilö:', newName)
    //Tarkastus onko sama
    console.log('nimen totuus:', persons.some(persons => persons.name === newName))
    console.log('numeron totuus:', persons.some(persons => persons.number === newNumber))

    //if lauseke tarkastaa molemmat nimen ja numeron, estäen lisäyksen listalle jos toisessakin on sama
    if (persons.some(persons => persons.name === newName) === true &&
      persons.some(persons => persons.number === newNumber) === true) {
      console.log('Nimi ja numero oli listalla')
      alert(`${newName} and ${newNumber} is already added to phonebook`)
    }
    else if (persons.some(persons => persons.name === newName) === true &&
      persons.some(persons => persons.number === newNumber) === false) {
      // personFind tehdään ennen if lauseketta, jotta henkilön nimi saadaan ilmoitukseen mukaan.
      const personFind = persons.find(person => person.name == newName)
      if (window.confirm(`Are you sure to change ${personFind.name} number?`)) {
        console.log('hei', newName)
        console.log('id + numero:', personFind.id, newNumber)
        personsService
          .updatePerson(personFind.id, newNumber, personFind)
          .then(response => { setPersons(persons.map(person => person.id !== personFind.id ? person : response.data)) })
          .catch(error => {
            setErrorMessage(`${personFind.name} not found anymore`)
            setErrorColor('error')
          })
        setTimeout(() => { setErrorMessage(null) }, 5000)
        setPersons(persons.filter(i => i.id !== personFind.id))
        //Alla olevat tulevat jos numero muutetaan onnistuneesti.
        setErrorMessage(`${personFind.name} number changed`)
        setErrorColor('notification')
        setTimeout(() => { setErrorMessage(null) }, 3000)
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personsService
        .createPerson(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
      setNewName('')
      setNewNumber('')
      setErrorMessage(`Added ${newName}`)
      setErrorColor('notification')
      setTimeout(() => { setErrorMessage(null) }, 3000)
    }
  }
  // event hadler nimikentän useState päivittämiseen
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  // event hadler puhelinnumero useState päivittämiseen
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterAll(event.target.value)
  }
  console.log(persons)
  const handleDelete = (event) => {
    const personData = persons.find(person => person.id == event.target.value)
    console.log('nimi on:', personData.name)
    if (window.confirm(`Are you sure to delele ${personData.name}`)) {
      console.log(event.target.value)
      const deletePerson = event.target.value
      personsService
        .personDelete(deletePerson)
      personsService
        .getPersons()
        .then(Response => {
          setPersons(Response.data)
        })
      setErrorMessage(`Deleted ${personData.name}`)
      setErrorColor('notification')
      setTimeout(() => { setErrorMessage(null) }, 3000)
    }
    else {
      personsService
        .getPersons()
        .then(Response => {
          setPersons(Response.data)
        })
    }
  }

  // suodatusta varten muistipaikka mikä map-funktiolla näytetään.
  //Toimiva filtteri ilman kirjain koon muokkausta
  //const filterNames = filterAll === '' ? persons : persons.filter(s => s.name.includes(filterAll))
  //console.log('tarkastus piste fillterille:', filterAll)
  const lowerCaseFilter = filterAll === undefined ? '' : filterAll.toLowerCase()
  //console.log('pienetkirjaimet:', lowerCaseFilter)

  const filterNames = filterAll === undefined ? persons : persons.filter(s =>
    s.name.toLowerCase().includes(lowerCaseFilter))
  //console.log('testi1', filterNames)
  //console.log('testi1 käyttäjän kirjoittama haku', filterAll)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorColor={errorColor} />
      <Filter filterAll={filterAll} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson} newName={newName}
        handlePersonChange={handlePersonChange} newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        <Persons filterNames={filterNames} handleDelete={handleDelete} />
      </ul>
    </div>
  )

}

export default App