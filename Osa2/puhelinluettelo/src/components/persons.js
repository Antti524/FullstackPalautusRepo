const Persons = (props) => {
    {
        return (props.filterNames.map(person =>
            <li key={person.name}>
                {person.name} {person.number} <button value={person.id} onClick={props.handleDelete} >Delete</button>
            </li>
        ))
    }
}

export default Persons