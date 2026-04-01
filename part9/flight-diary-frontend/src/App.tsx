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
          date :<input value={date} onChange={(event) => setDate(event.target.value)}/>
          <br/>
          weather :<input value={weather} onChange={(event) => setWeather(event.target.value)}/>
          <br/>
          visibility :<input value={visibility} onChange={(event) => setVisibility(event.target.value)}/>
          <br/>
          comment :<input value={comment} onChange={(event) => setComment(event.target.value)}/>
          <br/>
          <button type="submit">submit</button>
        </form>
    </div>
  );
};

export default App;