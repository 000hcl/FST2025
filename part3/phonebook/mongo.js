const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://db_user:${password}@cluster0.miz0cl0.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family:4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)


const addNewPerson = (name, number) => {
    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close()
        
    })
}

const getAllPeople = () => {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    addNewPerson(name, number)
}

if (process.argv.length === 3) {
    getAllPeople()
}