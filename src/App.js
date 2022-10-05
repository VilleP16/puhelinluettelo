import { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import FilterContactList from './components/FilterList'
import PersonForm from './components/PersonForm'
import databaseFunctions from './DatabaseServices.js/dbServices'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterResultsBy, setFilterResultsBy] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccesMessage] = useState('')

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
          setSuccesMessage(`Contact ${contactToUpdate.name} updated succesfully`)
          setTimeout(() =>{
            setSuccesMessage('')
          }, 5000)
        })
        .catch(error =>{
          setErrorMessage('An error occured when updating the contact')
          setTimeout(() =>{
            setErrorMessage('')
          }, 5000)
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
        setSuccesMessage(`Contact ${newContact.name} added!`)
          setTimeout(() =>{
            setSuccesMessage('')
          }, 5000)
      })
      .catch(error =>{
        setErrorMessage('An error occured when adding the contact')
        setTimeout(() =>{
          setErrorMessage('')
        }, 5000)
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
      setSuccesMessage(`Contact ${props.name} deleted!`)
          setTimeout(() =>{
            setSuccesMessage('')
          }, 5000)
      })
    .catch(error =>{
      setErrorMessage('An error occured when deleting the contact')
          setTimeout(() =>{
            setErrorMessage('')
          }, 5000)
    })
    }
  }

  return (
    <div>
      <Notification errorMessage = {errorMessage} successMessage = {successMessage}/>
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