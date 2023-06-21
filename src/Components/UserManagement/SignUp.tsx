import "./Signin.css";
import { images } from "../../Utils/constants";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataEncrypt } from "../../Utils/dataEncrypt";
import { signUp } from "../../Slices/AuthSlice";
import {emailValidation, nameValidation, passwordValidation, phoneValidation} from "../../Utils/passwordValidation";
import ToastMessage from "../../Utils/ToastMessage";
import  'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../../hooks/dispatchSelectorHooks";
import {
  StyledContainerSignup,
  StyledForm,
  StyledLogo,
  StyledInnerContainer,
  StyledFormInput,
  StyledFormLabel,
  StyledLink,
  StyledLinkContainer,
  StyledQuestion,
  StyledErrorMsg,
  StyledInfo,
  StyledInfoSymbol,
} from "./style";
import Button from "../Button/Button";

export interface FormData {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phoneNumber: string;
    confirmPassword?: string;
    email?: string;
  }

const SignUp = () => {
    const dispatch = useAppDispatch();
    const formRef = useRef(null);
    const [error, setErrorMsg] = useState("")
    const [toLogin, setToLogin] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        "firstName": '',
        "lastName": '',
        "username": '',
        "password": '',
        "phoneNumber": '',
        "confirmPassword": '',
        "email": ''
    });

    const { firstName, lastName, username, password, phoneNumber, confirmPassword, email } = formData


    /**
     * Validates the input field value to its corresponding regular expression.
     * @param {object} data
     * @returns 
     */
    const signupValidation = ({ firstName , lastName, username, phoneNumber, password, confirmPassword }: FormData) => {
        
        if (!nameValidation(firstName)) {
            return { validate: false, errorMsg: "*Only Alphabets in Name" }
        }
        if (!nameValidation(lastName)) {
            return { validate: false, errorMsg: "*Only Alphabets in Name" }
        }
        if (!emailValidation(username)) {
            return { validate: false, errorMsg: "*Invalid Email" }
        }
        if (!phoneValidation(phoneNumber)) {
            return { validate: false, errorMsg: "*Invalid Phone number" }
        }
        if (password) {
            let result = passwordValidation({ password: password, page: "signup" })
            if (result.validate) {
                if (password !== confirmPassword) {
                    return { validate: false, errorMsg: "*Confirm Password doesn't match" }
                }
            } else {
                return result
            }
        }
        return { validate: true, errorMsg: "" }
    }


    const notify = (name: string, type: string) => {
        ToastMessage(type, `Welcome ${name}, Registered Successfull . Login!`, "top-center", 2000, false)
    }


    const handleSubmit = async () => {
        console.log(formRef.current)
        let route = signupValidation(formData)
        if (route.validate) {
            setErrorMsg("")
            let { confirmPassword, ...payload } = formData
            payload = { ...payload, "password": await dataEncrypt(formData.password), "email": formData.username }
            const response = await dispatch(signUp(payload))
            if (response.payload) {
                notify(payload.firstName, "success")
                setToLogin(route.validate)
            }
            else {
                setErrorMsg("Invlaid")
            }
        }
        else {
            setErrorMsg(route.errorMsg)
        }
    }

    useEffect(() => {
        setErrorMsg("")
    }, [formData, dispatch])


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    return (
        <StyledContainerSignup>
            {toLogin ? <Navigate to="/login" /> : null}
            <StyledForm onSubmit={handleSubmit} ref={formRef}>
                <StyledLogo alt="logo" src={`${images}/Logo.png`} />
                <StyledErrorMsg ><p>{error ? error : ''}</p></StyledErrorMsg>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={firstName} name='firstName' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>First Name</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={lastName} name='lastName' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Last Name</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={email} name='username' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Email</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={phoneNumber} name='phoneNumber' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Phone Number</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={password} name='password' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Password</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="password" className='form-input' value={confirmPassword} name='confirmPassword' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Confirm Password</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInfo>
                    {/* <StyledInfoSymbol><FontAwesomeIcon icon={faInfo} /></StyledInfoSymbol> */}
                    Password should contain atleast one uppercase & lowercase alphabet, one symbol (@,#,$,%,&) and one numeric.
                </StyledInfo>
                <Button
                    title="SIGN UP"
                    hover=" 0 10px 36px rgba(0, 0, 0, .25)"
                    margin="20px auto"
                    borderRadius="20px"
                    variant="filled"
                />
                <StyledLinkContainer >
                    <StyledQuestion>Already a Emart user?  <Link to="/login"><StyledLink >SIGN IN</StyledLink></Link> </StyledQuestion>
                </StyledLinkContainer>
            </StyledForm>
        </StyledContainerSignup>
    )
}
export default SignUp;
