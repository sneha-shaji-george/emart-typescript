import "./Signin.css";
import {passwordValidation,emailValidation,
} from "../../Utils/passwordValidation";
import { images } from "../../Utils/constants";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch , useSelector} from "react-redux";
import { ToastContainer } from "react-toastify";
import { fetchUserProfile, login } from "../../Slices/AuthSlice";
import { dataEncrypt } from "../../Utils/dataEncrypt";
import ToastMessage from "../../Utils/ToastMessage";
import LoadingSpinner  from "../LoadingSpinner/LoadingSpinner";
import {
  StyledContainerSignin,
  StyledForm,
  StyledLogo,
  StyledInnerContainer,
  StyledFormInput,
  StyledFormLabel,
  StyledLink,
  StyledLinkContainer,
  StyledQuestion,
  StyledErrorMsg,
  Styledshow,
} from "./style";
import Button from "../Button/Button";

const SignIn = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const profileCheckPending = useSelector((state) => state.user.profileChecking);
  const notSession = useSelector((state) => state.user.inSession);
  const dispatch = useDispatch();
  let { enteredUsername, enteredPassword } = formData;
  
  /**
   * To show a toast message on session termination.
   * @param {string} name 
   * @param {string} type 
   */
  const notify = (name, type) => {
    ToastMessage(type, `Session over.Sign in again!`, "top-center", 2000, false)
  }
 


  /**
   * Validates the email and password withrespect to the regular expression.
   * @param {object} data
   * @returns
   */
  const loginValidation = (data) => {
    if (!emailValidation(data.username)) {
      return { validate: false, errorMsg: "*Invalid Email" };
    }
    return passwordValidation({ password: data.password, page: "signin" });
  };


  /**
   * Handles the validaton of the data inputed, through the loginValidation function where
   *formData ia passed.
   * @param {object} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = { username: "", password: "" };
    let route = loginValidation(formData);
    if (route.validate) {
      setErrorMsg("");
      payload.password = dataEncrypt(formData.password);
      payload.username = formData.username;
      const response = await dispatch(login(payload))
      if (response.payload) {
        dispatch(fetchUserProfile())
        setRedirect(route.validate)
      }
      else {
        if (response.error.message == "Unauthorized") {
          setErrorMsg("Password Invalid")
        }
        else {
          setErrorMsg(response.error.message)
        }
      }
    }
    else {
      setErrorMsg(route.errorMsg);
    }
  }

  /**
   * useEffect hook.
   */
  useEffect(() => {
     !notSession && notify(null, "info")
  }, []);

  /**
   * Save the inputs from the user in the signin fields into the formData object.
   * @param {object} event
   */
  function handleChange(event) {
    setErrorMsg("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  /**
   * Toggles the type of the input field making the password appear or not.
   * @param {object} event
   * @returns
   */
  const togglePassword = (event) => {
    event.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    profileCheckPending ? <LoadingSpinner/> :
    <StyledContainerSignin>
      <ToastContainer />
      {redirect ? <Navigate to="/home" /> : null}
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <StyledLogo alt="logo" src={`${images}/Logo.png`} />
        {errorMsg ? (
          <StyledErrorMsg>
            <p>{errorMsg}</p>
          </StyledErrorMsg>
        ) : (
          ""
        )}
        <StyledInnerContainer>
          <StyledFormInput
            type="text"
            className="form-input"
            value={enteredUsername}
            name="username"
            onChange={(e) => handleChange(e)}
            required
            autoComplete="off"
          />
          <StyledFormLabel htmlFor="" className="form-label">
            Email
          </StyledFormLabel>
        </StyledInnerContainer>
        <StyledInnerContainer>
          <StyledFormInput
            type={passwordType}
            className="form-input"
            value={enteredPassword}
            name="password"
            onChange={(e) => handleChange(e)}
            required
            autoComplete="off"
          />
          <StyledFormLabel htmlFor="" className="form-label">
            Password
          </StyledFormLabel>
          <Styledshow onClick={togglePassword}>
            {passwordType === "password" ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </Styledshow>
        </StyledInnerContainer>
        <StyledInnerContainer>
          <Button
            title="SIGN IN"
            hover=" 0 10px 36px rgba(0, 0, 0, .25)"
            width="35%"
            margin="20px auto"
            borderRadius="20px"
            type="submit"
            className="btn"
            variant="filled"
          />
        </StyledInnerContainer>
        <StyledLinkContainer>
          <StyledQuestion>
            {" "}
            New to Emart ?{" "}
            <Link to="/signup">
              <StyledLink> SIGN UP</StyledLink>
            </Link>
          </StyledQuestion>
        </StyledLinkContainer>
      </StyledForm>
    </StyledContainerSignin>
  );
};

export default SignIn;
