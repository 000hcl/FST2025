import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

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
        setNotification(`Added ${newName}.`)
        setTimeout(()=>{
          setNotification(null)
        }, 5000)
        
      })
      .catch(error => {
        setError(`${error.response.data.error}`)
        setTimeout(()=>{
          setError(null)
        }, 5000)
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
        setNotification(`Changed number for ${newName}.`)
        setTimeout(()=>{
          setNotification(null)
        }, 5000)
      })
      .catch((error) => {
          const msg = error.response.data.error
          console.log(msg);
          if (msg) {
            setError(msg)
          } else {
            setError(`Information on ${newName} has already been removed from server.`)
            setPersons(persons.filter(p => p.id !== person.id))
          }
          setTimeout(()=>{
            setError(null)
          }, 5000)
          
      })
  }

  const handleDelete = (id) => {
    const person = persons.find(person=>person.id===id)
    if (window.confirm(`Delete ${person.name}?`)===true){

      phonebookService.deletePerson(id)
        .then(() =>{

          setPersons(persons.filter(person=>person.id!==id))
          setNotification(`Deleted ${person.name} successfully.`)
          setTimeout(()=>{
          setNotification(null)
          }, 5000)
        }).catch(() => {
          setError(`Information on ${person.name} has already been removed from server.`)
          setTimeout(()=>{
            setError(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
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
      <Notification message={notification} classname={'notification'}/>
      <Notification message={error} classname={'error'}/>
      <Filter handleChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} nameVal={newName} numberVal={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={namesToShow} deleteFunc={handleDelete}/>

    </div>
  )
}

export default App