const PersonForm = (props) =>{
    return(
        <form onSubmit={props.addContact}>
        <div>
          name: <input value={props.newName} onChange={props.handleInputChange} />
        </div>
        <div>
          phone: <input value={props.newPhone} onChange={props.handlePhoneInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default PersonForm