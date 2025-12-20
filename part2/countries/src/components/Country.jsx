
const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                Capital: {country.capital.join()}
                <br />
                Area: {country.area}
            </div>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.flags.png}/>
        </div>
    )
}

const CountryList = ({countries}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter.
            </div>
        )
    }
    if (countries.length === 1) {
        return (
            <Country country={countries[0]}/>
        )
    }
    if (countries.length === 0) {
        return (
            <div>
                No matches found.
            </div>
        )
    }
    return (
            <div>
                {countries.map(c => (
                    <li key={c.name.common}>{c.name.common}</li>))}

            </div>
        )
}

export default CountryList