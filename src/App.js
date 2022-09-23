import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Lionel Messi', phone: '0407771234' },
    { name: 'Cristiano Ronaldo', phone : '01001000' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneInputChange = (event) =>{
    setNewPhone(event.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <PersonsList persons={persons} />
      <h2>Numbers</h2>
      ...
      <div>debug: {newName}</div>
      <div>debug: {newPhone}</div>

    </div>
  )
}

const PersonsList = ({ persons }) => {
  //console.log(persons)
  return (
    <div>
      {persons.map((person) => {
        return <Person name={person.name} phone = {person.phone} key={person.name} />
      })}
    </div>
  )
}
const Person = (props) => {
  return (
    <p>{props.name} {props.phone}</p>
  )
}


export default App