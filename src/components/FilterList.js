

const FilterContactList = (props) =>{
    return(
        <div>
            Filter contact list: <input value={props.filterResultsBy} onChange={props.handleFilterChange} />
        </div>
    )
}
export default FilterContactList