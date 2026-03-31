import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface PartProps {
    part: CoursePart;
}

const getPart = (part: CoursePart) => {
    switch (part.kind) {
        case ('basic'):
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br/>
                    <i>{part.description}</i>
                </p>
            )
        case ('group'):
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br/>
                    <div>group projects: {part.groupProjectCount}</div>
                </p>
            )
        case ('background'):
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br/>
                    <i>{part.description}</i>
                    <div>background material: {part.backgroundMaterial}</div>
                </p>
            )
        case ('special'):
            return (
                <p>
                    <b>{part.name} {part.exerciseCount}</b>
                    <br/>
                    <i>{part.description}</i>
                    <div>requirements: {part.requirements.join(', ')}</div>
                </p>
            )
        default:
            assertNever(part)
    }
}

const Part = (props: PartProps) => {
    return getPart(props.part)
}

export default Part