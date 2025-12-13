const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
}

const Part = (props) => {
return (
    <p>{props.part.name} {props.part.exercises}</p>
)
}

const Content = (props) => {
return(
<>
{props.parts.map((part) => 
    <Part key={part.id} part={part} />
)}
</>
)
}

const Course = ({course}) => {
return(
    <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </>
)
}

const Total = ({parts}) => {
return (
    <b>Total of {parts.reduce((sum, part)=> sum+part.exercises, 0)} exercises</b>
)
}

export default Course