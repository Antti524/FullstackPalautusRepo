import Course from "./components/course"

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curryculum</h1>
      {courses.map(course =>
        <div keys={course.id}>
          <Course course={course} />
        </div>
      )}
    </div>
  )
}
/*
const Course = ({ course }) => {

  const partSum = course.parts.reduce((x, v) =>
    x = x + v.exercises, 0)
  console.log('partsum', partSum)

  return (
    <div>
      <h4><b>{course.name}</b></h4>
      <ol>
        {course.parts.map((part) =>
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>)}
      </ol>
      <p><b>Total of {partSum} exercises</b></p>
    </div>
  )
}



const Courses = (props) => {
  const kurssit = () => props.courses.map((value, id) =>
    <div key={id}>
      <Header courses={value.name} />
    </div>
  )
  return (
    <div>
      {kurssit()}
    </div>
  )

  console.log('hei')
  const kurssit = Object.keys(props).map((key) => [String(key), props[key]])
  console.log(Object.fromEntries(kurssit))
  const kurssitSisältö = Object.keys(kurssit[0]).map((key) => [String(key), props[key]])
  console.log(Object.fromEntries(kurssitSisältö))
  //const kurssit = props.map((object) => { <div key={object.id}>{object.name}</div> })
  //console.log(kurssit)
  
  return (
    //{ kurssit }
    <div>hei</div>
  ) 
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
*/
/*
const Course = (props) => {
  console.log(props)
  const courses = props.course.name
  console.log(props)

  const partsKatalog = props.course.parts.map((part) =>
    <li key={part.id}>
      {part.name} {part.exercises}
    </li>)

  const partSum = props.course.parts.reduce((x, v) =>
    x = x + v.exercises, 0)
  console.log('partsum', partSum)
  console.log(props.course.parts.reduce((x, v) =>
    x = x + v.exercises, 0))

  return (
    <div>
      <h2><b>{courses}</b></h2>
      {partsKatalog}
      <b>Total of {partSum} exercises</b>
    </div>
  )
}



      <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
      </div>
 
const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}
 
const Content = (props) => {
  console.log('Content', props)
  return (
    <div>
      <Part name={props.parts.map((part, i) => <p key={i}> {part.name} {part.exercises}</p>)} />
    </div>
  )
}
const Part = (props) => {
  console.log('Part', props)
  return (
    <div>{props.name} {props.exercises}</div>
  )
}
 
const Total = (props) => {
  console.log('Total', props)
  return (
    <div>
      <p>Number of exercises {props.total} </p>
    </div>
  )
}
 
 Tämä osa on koodin pois sulkemista varten. Tänne laitetut osat tuodaan takaisin pala kerrallaan, 
jotta voidaan testata yksi asia kerrallaan.
 
*/
export default App