import { useContext } from "react"
import { NameContext } from "."

export default function TreeComponentSomeLabel(){
    const {fullName} = useContext(NameContext);
    return(
        <div>
            {fullName.firstName} {fullName.lastName}
        </div>
    )
}