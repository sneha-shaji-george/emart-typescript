import { validationRegExps } from "./constants";

interface PassswordValidation {
   password : string,
   page : string
}

export const passwordValidation = ({ password, page } : PassswordValidation ) => {
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

export const emailValidation = (username : string) => {

   return (validationRegExps.emailValidationRegExp.test(username))
}


export const nameValidation = (name : string) => {

   return (validationRegExps.nameValidatorRegExp.test(name))
}

export const phoneValidation = (phone : string) => {

   return (validationRegExps.phoneValidationRegExp.test(phone))
}

export const addressValidation = (address : string) => {

   return (validationRegExps.addressRegexExp.test(address))
}

export const zipCodeValidation = (zipcode : string) => {
   
   return (validationRegExps.zipCodeRegExp.test(zipcode))
}
