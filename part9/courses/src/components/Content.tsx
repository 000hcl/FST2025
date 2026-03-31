import Part from "./Part";
import type { CoursePart } from "../types";

interface ContentArray {
    parts: CoursePart[];
}



const Content = (props: ContentArray) => {
    return (
        <div>
            {props.parts.map(((p:CoursePart) => <Part part={p}/>))}
        </div>
    )
}

export default Content