import { validationRegExps } from "./constants";

export const passwordValidation = ({ password, page }) => {
   if (page === "signin") {
      if (!(validationRegExps.passwordValidationRegExp.test(password))) {
         return { validate: false, errorMsg: "*Invalid Passsword Format" }
      }
   }
   else {
      if (password.trim().length < 8 || password.trim().length > 30) {
         return { validate: false, errorMsg: "*Password should be between 8 and 30 characters" }
      }
      if (!validationRegExps.uppercaseRegExp.test(password)) {
         return { validate: false, errorMsg: "*Password should contain atleast one Uppercase alphabet" }
      }
      if (!validationRegExps.lowercaseRegExp.test(password)) {
         return { validate: false, errorMsg: "*Password should contain atleast one Lowercase alphabet" }
      }
      if (!validationRegExps.digitsRegExp.test(password)) {
         return { validate: false, errorMsg: "*Password should contain atleast one Digit" }
      }
      if (!validationRegExps.specialCharRegExp.test(password)) {
         return { validate: false, errorMsg: "*Password should contain atleast one Special character" }
      }
      if (validationRegExps.spaceRegExp.test(password)) {
         return { validate: false, errorMsg: "*No Spaces in password" }
      }
   }
   
   return { validate: true, errorMsg: "" }
    
}

export const emailValidation = (username) => {

   return (validationRegExps.emailValidationRegExp.test(username))
}


export const nameValidation = (name) => {

   return (validationRegExps.nameValidatorRegExp.test(name))
}

export const phoneValidation = (phone) => {

   return (validationRegExps.phoneValidationRegExp.test(phone))
}

export const addressValidation = (address) => {

   return (validationRegExps.addressRegexExp.test(address))
}

export const zipCodeValidation = (zipcode) => {
   
   return (validationRegExps.zipCodeRegExp.test(zipcode))
}
