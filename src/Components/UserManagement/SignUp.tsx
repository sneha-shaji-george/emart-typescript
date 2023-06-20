import "./Signin.css";
import { images } from "../../Utils/constants";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataEncrypt } from "../../Utils/dataEncrypt";
import { signUp } from "../../Slices/AuthSlice";
import {emailValidation, nameValidation, passwordValidation, phoneValidation} from "../../Utils/passwordValidation";
import ToastMessage from "../../Utils/ToastMessage";
import  'react-toastify/dist/ReactToastify.css';
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

const SignUp = () => {

    const dispatch = useDispatch();
    const [error, setErrorMsg] = useState("")
    const [toLogin, setToLogin] = useState(false)
    const [formData, setFormData] = useState({
        "firstName": '',
        "lastName": '',
        "username": '',
        "password": '',
        "phoneNumber": '',
        "confirmPassword": '',
        "email": ''
    });

    const { enteredFirstName, enteredLastName, enteredUsername, enteredPhoneNumber, enteredPassword, enteredConfirmPassword } = formData


    /**
     * Validates the input field value to its corresponding regular expression.
     * @param {object} data
     * @returns 
     */
    const signupValidation = ({ firstName, lastName, username, phoneNumber, password, confirmPassword }) => {
        
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


    /**
    * Function to display toast message when user has successfully signed up.
    */
    const notify = (name, type) => {
        ToastMessage(type, `Welcome ${name}, Registered Successfull . Login!`, "top-center", 2000, false)
    }


    /**
     * Handles the validaton of the data inputed, through the signupValidation function where 
     * formData ia passed.
     * @param {object} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
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
                setErrorMsg(response.error.message)
            }
        }
        else {
            setErrorMsg(route.errorMsg)
        }
    }


    /**
     * useEffect hook to changes the error messages onChange to the entered value.
     */
    useEffect(() => {
        setErrorMsg("")
    }, [formData, dispatch])


    /**
     * Save the inputs from the user in the signup fields into the formData object.
     * @param {object} event 
     */
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    return (
        <StyledContainerSignup>
            {toLogin ? <Navigate to="/login" /> : null}
            <StyledForm onSubmit={e => handleSubmit(e)} >
                <StyledLogo alt="logo" src={`${images}/Logo.png`} />
                <StyledErrorMsg ><p>{error ? error : ''}</p></StyledErrorMsg>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={enteredFirstName} name='firstName' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>First Name</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={enteredLastName} name='lastName' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Last Name</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={enteredUsername} name='username' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Email</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={enteredPhoneNumber} name='phoneNumber' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Phone Number</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="text" className='form-input' value={enteredPassword} name='password' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Password</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInnerContainer>
                    <StyledFormInput type="password" className='form-input' value={enteredConfirmPassword} name='confirmPassword' onChange={e => handleChange(e)} autoComplete="off" required />
                    <StyledFormLabel htmlFor='' className='form-label'>Confirm Password</StyledFormLabel>
                </StyledInnerContainer>
                <StyledInfo>
                    <StyledInfoSymbol><FontAwesomeIcon icon={faInfo} /></StyledInfoSymbol>
                    Password should contain atleast one uppercase & lowercase alphabet, one symbol (@,#,$,%,&) and one numeric.
                </StyledInfo>
                <Button
                    title="SIGN UP"
                    hover=" 0 10px 36px rgba(0, 0, 0, .25)"
                    width="35%"
                    margin="20px auto"
                    borderRadius="20px"
                    type="submit"
                    className="btn"
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
