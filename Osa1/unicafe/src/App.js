import { useState } from 'react'

const Statistics = (props) => {
  if (props.allClicks < 5) {
    // Tehtävän annossa mainittiin palautteita, määrittelin hyvän käytännön mukaan että monikossa 5 palautetta pitää olla ennen statistiikan näkymistä.
    return (
      <div>
        Stattistics show when there is 5 or more!
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text='Good' value={props.good} marking='' />
            <StatisticLine text='Neutral' value={props.neutral} marking='' />
            <StatisticLine text='Bad' value={props.bad} marking='' />
            <StatisticLine text='All' value={props.allClicks} marking='' />
            <StatisticLine text='Average' value={props.average} marking='' />
            <StatisticLine text='Positive' value={props.positive} marking='%' />
          </tbody>
        </table>
      </div>
    </div>
  )
}

const StatisticLine = ({ text, value, marking }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}{marking}</td>
  </tr>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // Muistipaikat
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)
  //Laskee keskiarvon hyvän arvo 1, neutraalin 0, huonon -1. Neutraalit on jätetty pois turhana yksikkona. 
  const average = ((good * 1) + (bad * -1)) / allClicks
  const positive = good / allClicks

  // Muistipaikan lisääjät
  const handleGoodClick = () => {
    setAllClicks(allClicks + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAllClicks(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAllClicks(allClicks + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={good} allClicks={allClicks} average={average} positive={positive} />
    </div>
  )
}

export default App