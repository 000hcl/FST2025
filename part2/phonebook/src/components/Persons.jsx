const Persons = ({persons, deleteFunc}) => {
    return(
        <div>
            {persons.map(person =>
                <li key={person.id}>{person.name} {person.number} <button onClick={()=>deleteFunc(person.id)}>delete</button></li>
            )}
        </div>
    )
}

export default Persons