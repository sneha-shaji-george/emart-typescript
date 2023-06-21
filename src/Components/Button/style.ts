import styled from "styled-components";
import { brown, disabledClr, lightCream, white } from "../../Utils/colors";
import { ButtonType } from "./Button";

export const StyledButton = styled.button<ButtonType>`
  color: ${(props) => (props.variant === "filled" ? white : brown)};
  background: ${(props) => (props.variant === "filled" ? brown : lightCream)};
  border: ${(props) =>
    props.variant == "filled" ? "none" : `2px solid ${brown}`};
  -webkit-transition: all 0.5s ease-in-out 0s;
  transition: all 0.5s ease-in-out 0s;
  cursor: pointer;
  align-items: center;
  display: block;
  line-height: 1;
  font-weight: bold;
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius || "5px"};
  font-size: 12px;
  &:disabled {
    color: ${white};
    background: ${disabledClr};
    border: ${disabledClr};
  }
  ${(props) =>
    props.hover
      ? ` &:hover {
      background: ${brown};
      color: ${white} ;
      box-shadow: ${props.hover}
    }
`
      : ` &:hover {
    }
`};
`;
