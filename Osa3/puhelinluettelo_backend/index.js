require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/db')
//Tämä osio määrittää buildin käytettäväksi
app.use(express.static('build'))

//Morgan osio alkaa
//app.use(morgan('tiny')) morganin tiny näkyy tällä konsolissa
app.use(express.json())
// morganilla on custom token, nimeltä POST
morgan.token('POST', req => {
    return JSON.stringify(req.body)
})
//Morganin Tiny on kopiotu esille panon asetteluksi ja perään on lisätty custom token POST
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST'))
//Morgan pyyntöjen lokitus kun sivuilla käydään.
app.get('/', function (req, res) {
    return
})
//Morgan osio Loppuu

//CORS osio alkaa
const cors = require('cors')
const { response } = require('express')

app.use(cors())
//CORS osio Loppuu

let persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
    { id: 5, name: 'Veikko Mainio', number: '+358-4012312321' }
]

//http://localhost:3001/api/persons sivun vastaus get pyyntöön näyttää json-muodossa persons listan
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

//http://localhost:3001/info sivun vastaus get pyyntöön
app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        response.end(`<h3>INFO</h3><p>Phonebook has info for ${persons.length} people.<br>${Date()}</p>`)
    })
    /*
    console.log('persons array length is:', persons.length)
    console.log('Kello on:', Date())
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(`<h3>INFO</h3><p>Phonebook has info for ${persons.length} people.<br>${Date()}</p>`)
    */
})

//http://localhost:3001/api/persons/5 sivun vastaus yhteen persoonaan
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
    /*
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }*/
})

//http://localhost:3001/api/persons/5 sivun poisto DELETE komennolla
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    /*
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
    */
})

//http://localhost:3001/api/persons uuden lisääminen luetteloon Sisältää osat 1-
//Osa 1: Generoi satunnaisluvun 1-200 väliltä sekä tarkastaa ettei luku ole käytössä.
const generateId = () => {
    console.log('Start generating new number...')
    const newId = parseInt(Math.random(200) * 50000)
    if ((persons.find(person => person.id === newId)) !== undefined) {
        console.log(`oops! Id was already use! id was ${newId}`)
        return generateId()
    } else {
        console.log(`new is generated ${newId}`)
        return newId
    }
}
//Osa 2: Sivulla näkee Person listan ja konsolissa id generoinnin.
app.get('/testRandom', (request, response) => {
    //testi consoliin satunnaisluvusta. liittyy generateId funktioon
    const testId = generateId()
    console.log('testi id:', testId)
    response.json(persons)
})
//Osa 3: Henkilön lisääminen
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    console.log(body.name)
    console.log('Löytötulokset:', persons.find(person => person.name === body.name))
    const maybeInPhoneBook = persons.find(person => person.name === body.name)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (maybeInPhoneBook?.name === body.name) {
        return response.status(400).json({
            error: 'name exist already'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(persons => {
        response.json(persons)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

// tuntemattomat osoitteet saavat 404
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

//Virheiden käsittelijä. Lisää perään uudet virheet, kun niitä tulee
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

//const PORT = process.env.PORT || 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})