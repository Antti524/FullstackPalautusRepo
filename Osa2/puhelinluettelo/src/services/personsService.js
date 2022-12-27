import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(baseUrl)
}

const createPerson = (personObject) => {
    console.log('PersonService objekti:', personObject)
    return axios.post(baseUrl, personObject)
}

const personDelete = (deletePerson) => {
    const pDetele = baseUrl + '/' + deletePerson
    console.log(pDetele)
    return axios.delete(pDetele, deletePerson)
}

const updatePerson = (id, newPersonNumber, person) => {
    console.log('updatePerson sai id ja numero', id, newPersonNumber)
    const url = `http://localhost:3001/persons/${id}`
    person = { ...person, number: newPersonNumber }
    return axios.put(url, person)
}

export default {
    getPersons,
    createPerson,
    personDelete,
    updatePerson
}