import { useState, useEffect } from "react";
import axios from "axios";

interface DiaryEntry {
  id: string;
  date: string;
  weather: string;
  visibility: string;
} 

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data)
    })
  })
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
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;