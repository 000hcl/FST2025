import { useState, useEffect } from "react";
import axios from "axios";

interface DiaryEntry {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}
type NewDiaryEntry = Omit<DiaryEntry, 'id'>


const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [visibility, setVisibility] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data)
    })
  })
  const errorNotification = (message: string) => {
    setError(message)
    setTimeout(()=> setError(''), 5000)
  }
  const createEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()

      const newEntry:NewDiaryEntry = {
        visibility,
        weather,
        date,
        comment
      }
      axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newEntry).then(
        response => {
          setEntries(entries.concat(response.data))
        }
      ).catch((error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data
          console.log(errorMessage)
          errorNotification(errorMessage)
        } else {
          console.error(error)
        }
      })


  }
  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        {entries.map((e) => (
          <p key={e.id}>
            <b>{e.date}</b>
            <br/>
            weather: {e.weather}
            <br/>
            visibility: {e.visibility}
            <br/>
            comment: {e.comment}
          </p>
        ))}
      </div>
      <h2>add new</h2>
      <b>{error}</b>
        <form onSubmit={createEntry}>
          <div>
            date:
            <input
            type="date"
            onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            weather:

            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('sunny')}
            />
            sunny
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('rainy')}
            />
            rainy
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('cloudy')}
            />
            cloudy
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('stormy')}
            />
            stormy
            <input
              type="radio"
              name="weather"
              onChange={() => setWeather('windy')}
            />
            windy
          </div>
          <div>
            visibility:
            
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility('great')}
            />
            great
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility('good')}
            /> 
            good
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility('ok')}
            /> 
            ok
            <input
              type="radio"
              name="visibility"
              onChange={() => setVisibility('poor')}
            />
            poor
          </div>
          comment :<input value={comment} onChange={(event) => setComment(event.target.value)}/>
          <br/>
          <button type="submit">submit</button>
        </form>
    </div>
  );
};

export default App;