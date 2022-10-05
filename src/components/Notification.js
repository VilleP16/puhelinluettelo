
const Notification = ({errorMessage, successMessage}) => {
   if(errorMessage !== ''){
    return(
        <div className="errorMessage">
            <h3>{errorMessage}</h3>
        </div>
    )
   }else if(successMessage !== ''){
    return(
        <div className="successMessage">
            <h3>{successMessage}</h3>
        </div>
    )
   }else{
    return(
        <div></div>
    )
   }
  
    
}



export default Notification