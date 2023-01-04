const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const nameArgv = process.argv[3]
const numberArgv = process.argv[4]

const url =
    `mongodb+srv://feah25725jf2T:${password}@cluster0.yskbo9n.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: nameArgv,
    number: numberArgv,
})

if (process.argv[3] === null) {
    person.save().then(result => {
        console.log(`added ${nameArgv} number ${numberArgv} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
}