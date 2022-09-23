import { useState } from 'react'
import PersonsList from './components/PersonsList'
import FilterContactList from './components/FilterList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Lionel Messi', phone: '0407771234' },
    { name: 'Cristiano Ronaldo', phone : '01001000' },
    { name: 'Rio Ferdinand', phone: '04466734' },
    { name: 'Karim Benzema', phone: '099003394959' },
    { name: 'David De Gea', phone: '098767656254' },
    { name: 'David Silva', phone: '05050505050' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterResultsBy, setFilterResultsBy] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneInputChange = (event) =>{
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilterResultsBy(event.target.value)
    console.log(contactsToShow)
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
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
      <PersonsList persons={contactsToShow} />
    </div>
  )
}

export default App