import {StyledButton} from "./style"

export interface ButtonType {
    title? : string,
    variant : string,
    margin : string,
    borderRadius : string,
    hover : string,
}

export default function Button (props:ButtonType){
    return(
        <StyledButton {...props}>
            {props.title}
        </StyledButton>
    )
} 