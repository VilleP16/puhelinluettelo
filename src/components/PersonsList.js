const PersonsList = ({ persons, handleClick }) => {
    //console.log(persons)
    return (
      <div>
        {persons.map((person) => {
          return <Person handleClick = {handleClick} name={person.name} phone = {person.phone} key={person.name} id={person.id} />
        })}
      </div>
    )
  }
  const Person = (props) => {
    return (
      <div>
    {props.name} {props.phone} &nbsp;
      <button onClick={props.handleClick(props)}>Delete</button>
      </div>
    )
  }
  export default PersonsList