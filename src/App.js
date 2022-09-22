import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Cristiano Ronaldo'}
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addContact = (event) =>{
    event.preventDefault()
    
    const personObject = {
      name : newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange = {handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <PersonsList persons = {persons}/>
      <h2>Numbers</h2>
      ...
      <div>debug: {newName}</div>
      
    </div>
  )

}

const PersonsList  = ({persons}) =>{
  //console.log(persons)
  return(
    <div>
      {persons.map((person) =>{
        return <Person name = {person.name} key = {person.name} />
      })}

    </div>

  )
}
const Person = (props) => {
  return(
    <p>{props.name}</p>
  )
}


export default App