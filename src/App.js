import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Lionel Messi' },
    { name: 'Cristiano Ronaldo' }
  ])
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  const addContact = (event) => {
    event.preventDefault()

    if (tarkistaOnkoNimiListalla()) {
      alert(`Henkilö ${newName} on jo listalla!`)
      setNewName('')

    } else {
      console.log('ei  ollut listalla')
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
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
          <button type="submit">add</button>
        </div>
      </form>
      <PersonsList persons={persons} />
      <h2>Numbers</h2>
      ...
      <div>debug: {newName}</div>

    </div>
  )
}

const PersonsList = ({ persons }) => {
  //console.log(persons)
  return (
    <div>
      {persons.map((person) => {
        return <Person name={person.name} key={person.name} />
      })}
    </div>
  )
}
const Person = (props) => {
  return (
    <p>{props.name}</p>
  )
}


export default App