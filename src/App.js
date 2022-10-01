import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonsList from './components/PersonsList'
import FilterContactList from './components/FilterList'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterResultsBy, setFilterResultsBy] = useState('')

  useEffect(() =>{
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneInputChange = (event) =>{
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilterResultsBy(event.target.value)
    //console.log(contactsToShow)
  }
  const addContact = (event) => {
    event.preventDefault()

    if (tarkistaOnkoNimiListalla()) {
      alert(`Henkilö ${newName} on jo listalla!`)
    } else {
      console.log('ei  ollut listalla')
      const personObject = {
        name: newName,
        phone: newPhone
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhone('')
    }
    //console.log(contactsToShow)
  }
  const tarkistaOnkoNimiListalla = () => {
    let onJoListalla = false
    persons.map((person) => {
      if (newName === person.name) {
        return onJoListalla = true
      }
      return null
    })
    return onJoListalla
  }
  const contactsToShow = persons.filter(function(person){
    return person.name.toLowerCase().includes(filterResultsBy.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterContactList filterResultsBy = {filterResultsBy} handleFilterChange = {handleFilterChange}/>
        <h2>Add a new contact</h2>
        <PersonForm addContact = {addContact} newName = {newName} handleInputChange = {handleInputChange} newPhone = {newPhone} handlePhoneInputChange = {handlePhoneInputChange}/>
      
      <h2>Contacts</h2>
      <PersonsList persons={contactsToShow} />
    </div>
  )
}

export default App