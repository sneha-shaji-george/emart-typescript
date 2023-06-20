import styled, { keyframes } from "styled-components";
import { brown, lightGrey, white } from "../../Utils/colors";

export const StyleMain = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    background-color: ${white};
    top: 110px;
    width: 100%;
    height: calc(100% - 110px);
`;

const spinnerAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const StyleLoadingSpinner = styled.div`
    width: 40px;
    height: 40px;
    border: 7px solid ${lightGrey};
    border-top: 7px solid ${brown};
    border-radius: 50%;
    animation: ${spinnerAnimation} 1.5s linear infinite;
`;