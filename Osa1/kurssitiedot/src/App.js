
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const total = Object.values(course.parts)[2].exercises + Object.values(course.parts)[1].exercises + Object.values(course.parts)[0].exercises
  console.log('total is here:' + total)

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log('Content' + props)
  return (
    <div>
      <Part name={props.parts.map((part, i) => <p key={i}> {part.name} {part.exercises}</p>)} />
    </div>
  )
}
const Part = (props) => {
  console.log('Part' + props)
  return (
    <div>{props.name} {props.exercises}</div>
  )
}

const Total = (props) => {
  console.log('Total' + props)
  return (
    <div>
      <p>Number of exercises {props.total} </p>
    </div>
  )
}
/*
 Tämä osa on koodin pois sulkemista varten. Tänne laitetut osat tuodaan takaisin pala kerrallaan, 
jotta voidaan testata yksi asia kerrallaan.

*/
export default App