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
  export default PersonsList