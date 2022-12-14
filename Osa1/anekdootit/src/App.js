import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  // Näytettävän Anekdootin tila
  const [selected, setSelected] = useState(0)
  // Satunnaisluku nuolifunktio näytetttävälle anekdootille
  const random = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  // Taulukko äänille
  let votes = [0, 0, 0, 0, 0, 0, 0];
  const [vote, setVotes] = useState(votes)

  const Votelist = () => {
    const nextVote = vote.map((c, i) => {
      if (i === selected) {
        // Kasvattaa näkyvän anekdootin ääntä yhdellä
        return c + 1
      } else {
        // Muut jäävät siihen arvoon kuin ovat
        return c
      }
    })
    setVotes(nextVote)
    console.log(nextVote)
    setMostvoted(Most)
    console.log(Most)
  }

  // Muistipaikka, Laskenta eniten ääniä saaneelle
  const [mostVotes, setMostvoted] = useState(0)
  const Most = vote.indexOf(Math.max(...vote))


  return (
    <div>
      {anecdotes[selected]}
      <div>
        <div>
          <br />
          <Button handleClick={Votelist} text="Vote" />
          <br />
          This anecdote has {vote[selected]} votes
          <br /><br />
          <Button handleClick={random} text="Random anecdote" />
          <br /> <br />
        </div>
        <div>
          {anecdotes[mostVotes]}
          <br /><br />
          This anecdote has {vote[mostVotes]} votes! What makes its most voted!
        </div>
      </div>
    </div>
  )
}

export default App