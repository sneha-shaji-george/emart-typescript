import "./Signin.css";
import {passwordValidation,emailValidation,
} from "../../Utils/passwordValidation";
import { images } from "../../Utils/constants";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
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
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchSelectorHooks";

const SignIn = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const profileCheckPending = useAppSelector((state) => state.user.profileChecking);
  const notSession = useAppSelector((state) => state.user.inSession);
  const dispatch = useAppDispatch();
  let { username, password } = formData;
  
  /**
   * To show a toast message on session termination.
   * @param {string} name 
   * @param {string} type 
   */
  const notify = (name : string, type : string) => {
    ToastMessage(type, `Session over.Sign in again!`, "top-center", 2000, false)
  }
 
   interface TypeLoginData {
    username : string,
    password : string
  }

  const loginValidation = (data : TypeLoginData) => {
    if (!emailValidation(data.username)) {
      return { validate: false, errorMsg: "*Invalid Email" };
    }
    return passwordValidation({ password: data.password, page: "signin" });
  };

  const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
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
          setErrorMsg("Invalid Email/Password")
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
     !notSession && notify("", "info")
  }, []);

  function handleChange(event : ChangeEvent<HTMLInputElement>) {
    setErrorMsg("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  /**
   * Toggles the type of the input field making the password appear or not.
   * @param {object} event
   * @returns
   */
  const togglePassword: React.MouseEventHandler<HTMLButtonElement> = (event) => {
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
      <StyledForm onSubmit={handleSubmit}>
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
            value={username}
            name="username"
            onChange={handleChange}
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
            value={password}
            name="password"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <StyledFormLabel htmlFor="" className="form-label">
            Password
          </StyledFormLabel>
          <Styledshow onClick={togglePassword}>
            {passwordType === "password" ? (
              <VisibilityOffIcon />
            ) : (
              <VisibilityIcon />
            )}
          </Styledshow>
        </StyledInnerContainer>
        <StyledInnerContainer>
          <Button
            title="SIGN IN"
            hover=" 0 10px 36px rgba(0, 0, 0, .25)"
            margin="20px auto"
            borderRadius="20px"
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
