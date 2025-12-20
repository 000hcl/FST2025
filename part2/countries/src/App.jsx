import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CountryList from './components/Country'
import countryService from './services/country'


function App() {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setAllCountries(initialCountries)
      })
  }, [])

  const countriesMatched = allCountries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <SearchBar handleChange={handleSearchChange}/>
      <CountryList countries={countriesMatched}/>
    </>
  )
}

export default App