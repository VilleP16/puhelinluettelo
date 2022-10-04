import { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import FilterContactList from './components/FilterList'
import PersonForm from './components/PersonForm'
import databaseFunctions from './DatabaseServices.js/dbServices'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterResultsBy, setFilterResultsBy] = useState('')

  useEffect(() =>{
    console.log('effect')
    databaseFunctions
    .getAll()
    .then(contactList =>{
      console.log('promise fulfilled', contactList)
      setPersons(contactList)
    })
    .catch(error =>{
      alert("Server connecting error. Please try again later!")
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
  }
  const addContact = (event) => {
    event.preventDefault()

    if (tarkistaOnkoNimiListalla()) {
      alert(`Henkilö ${newName} on jo listalla!`)
    } else {
      console.log('ei  ollut listalla')
      const newContactObject = {
        name: newName,
        phone: newPhone
      }
      databaseFunctions
      .createNewContact(newContactObject)
      .then(newContact => {
        console.log(newContact)
        setPersons(persons.concat(newContact))
        setNewName("")
        setNewPhone("")
      })
      .catch(error =>{
        alert("Could not add new contact. Please try again later!")
      })
    }
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
  const deleteContact = props => () =>{
    console.log('delete contact', props.id)
    if(window.confirm(`Delete ${props.name}?`)){
      databaseFunctions
    .deleteContact(props.id)
    .then(response =>{
      setPersons(persons.filter(person => person.id !== props.id))
      alert("Contact deleted succesfully!")
    })
    .catch("Something went wrong when deleting the contact. Try again later!")
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterContactList filterResultsBy = {filterResultsBy} handleFilterChange = {handleFilterChange}/>
        <h2>Add a new contact</h2>
        <PersonForm addContact = {addContact} newName = {newName} handleInputChange = {handleInputChange} newPhone = {newPhone} handlePhoneInputChange = {handlePhoneInputChange}/>
      
      <h2>Contacts</h2>
      <PersonsList persons={contactsToShow} handleClick = {deleteContact}/>
    </div>
  )
}

export default App