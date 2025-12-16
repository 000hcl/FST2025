const PersonForm = (props) => {
    return(
        <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.nameVal} onChange={props.nameChange}/>
        </div>
        <div>number: <input value={props.numberVal} onChange={props.numberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm