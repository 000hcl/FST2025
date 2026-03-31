interface ContentArray {
    parts: ContentProps[];
}

interface ContentProps {
    name: string;
    exerciseCount: number;
}

const Content = (props: ContentArray) => {
    return (
        <div>
            {props.parts.map(((p:ContentProps) => <p>{p.name} {p.exerciseCount}</p>))}
        </div>
    )
}

export default Content