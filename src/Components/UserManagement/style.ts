import styled from "styled-components";

export const StyledContainerSignup = styled.div`
  height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
    margin : -1% auto;
`;

export const StyledContainerSignin = styled.div`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  margin: -10% auto;
`;

export const StyledForm = styled.form`
  width: 450px;
  min-height: 300px;
  padding: 32px;
`;
export const StyledLogo = styled.img`
  height: 105px;
  width: 370px;
  padding: 25px 25px;
  cursor: pointer;
`;

export const StyledInnerContainer = styled.div`
  height: 48px;
  margin-bottom: 20px;
  position: relative;
`;

export const StyledFormInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  color: black;
  border: 1px solid #a1a1a1;
  outline: none;
  padding: 5px 40px 5px 20px;
  border-radius: 25px;
  z-index: 1;
  &:focus {
    border: 1px solid #a96f4a;
  }
`;

export const StyledQuestion = styled.p``;

export const StyledFormLabel = styled.label`
  position: absolute;
  left: 30px;
  top: 15px;
  color: #a1a1a1;
  background-color: white;
  padding: 0 6px;
  font-size: 15px;
  transition: 0.1s;
  cursor: pointer;
`;

export const StyledErrorMsg = styled.div`
  padding-bottom: 10px;
  text-align: center;
  color: red;
`;

export const Styledshow = styled.button`
  padding: 0;
  position: absolute;
  margin: 15px 10px 15px 350px;
  z-index: 3;
  background: white;
`;

export const StyledLink = styled.span`
  margin: 5px 10px;
  color: #a96f4a;
  cursor: pointer;
`;

export const StyledLinkContainer = styled.div`
  text-align: left;
  margin: 16px 16px;
  padding-left: 20px 10px;
`;

export const StyledInfo = styled.div`
  display: flex;
  text-align: left;
  margin: 5px 10px;
  color: #a96f4a;
  font-size: 13px;
`;

export const StyledInfoSymbol = styled.div`
  color: red;
  padding: 2px;
`;
