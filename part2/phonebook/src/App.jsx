import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.find(person =>
      person.name===newName
    )
    if (existing !== undefined) {
      const confirmChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmChange) {
        replacePerson(existing)
      }
    } else {
      const newPerson = { name: newName, number:newNumber }
      phonebookService
      .addNew(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }

  }

  const replacePerson = (person) => {
    const newPerson = { id: person.id,name: newName, number:newNumber }
    phonebookService.updatePerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.filter(p => p.id!==person.id).concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id) => {
    const person = persons.find(person=>person.id===id)
    if (window.confirm(`Delete ${person.name}?`)===true){

      phonebookService.deletePerson(id)
        .then(() =>{

          setPersons(persons.filter(person=>person.id!==id))
        }).catch(error =>{
          console.log(`${error}`)
        }
        )
    }

    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} nameVal={newName} numberVal={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={namesToShow} deleteFunc={handleDelete}/>

    </div>
  )
}

export default App