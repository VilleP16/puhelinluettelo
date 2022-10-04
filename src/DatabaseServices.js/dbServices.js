import axios from "axios";

const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
   const request = axios.get(baseUrl)
   return request.then(response => response.data)
}
const createNewContact = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
const deleteContact = id =>{
    const request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response => response.data)
}

const databaseFunctions = {
    getAll, 
    createNewContact,
    deleteContact
}

export default databaseFunctions