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

    if (checkContactsId() !== 0 ) {
      if(window.confirm("Contact found. Do you want to replace the phone number?")){
        const contactToUpdate = persons.find(person => person.id === checkContactsId())
        const updatedContactObject = { ...contactToUpdate, phone: newPhone}
        databaseFunctions
        .updateContact(contactToUpdate.id, updatedContactObject)
        .then(response =>{
          setPersons(persons.map(person => person.id !== contactToUpdate.id ? person : response))
          setNewName("")
          setNewPhone("")
          alert("Contact updated succesfully!")
        })
        
      }
    } else {
      console.log('ei  ollut listalla', checkContactsId())
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
  const checkContactsId = () => {
    let personId = 0
    //send id back as 0 if contact not found, otherwise id = contacts id
    persons.map((person) => {
      if (newName === person.name) {
        personId = person.id
      }
      return personId
    })
    return personId
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