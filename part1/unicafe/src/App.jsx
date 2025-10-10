import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Statistics = (props) => {
  const all = props.good+props.bad+props.neutral
  const average = (props.good-props.bad)/all
  const positive = (props.good)/all*100
  if (all==0) {
    return <p>No feedback given</p>
  } else {
    return (
      <>
        <h1>statistics</h1>
        good {props.good}
        <br />
        neutral {props.neutral}
        <br />
        bad {props.bad}
        <br />
        all {all}
        <br />
        average {average}
        <br />
        positive {positive}%
      </>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>setGood(good+1)} text='good' />
      <Button onClick={()=>setNeutral(neutral+1)} text='neutral' />
      <Button onClick={()=>setBad(bad+1)} text='bad' />
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App