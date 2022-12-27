const Course = ({ course }) => {

    const partSum = course.parts.reduce((x, v) =>
        x = x + v.exercises, 0)
    console.log('partsum is', partSum)

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

export default Course