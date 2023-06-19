export const BASE_URL = process.env.REACT_APP_NEW_ARRIVAL;
export const URL = process.env.REACT_APP_BASE_URL;


export const images = "/assets/images";

export const Slider_data = [
  {
    id: 3,
    category_name: "furniture",
    image: "/assets/images/BannerHomeDecor.jpg",
    title: "All New Home Decor Collection",
  },
  {
    id: 7,
    category_name: "fragrances",
    image: "/assets/images/perfume2.avif",
    offer: "20% Off",
    title: "on Our Top Picks for BURBERRY PERFUMES",
  },
];

export const validationRegExps = {
  emailValidationRegExp: /^[\w-\.]+@([\w-]+\.)+[a-z]{2,4}$/,
  nameValidatorRegExp :/^[A-Za-z\s]*$/,
  passwordValidationRegExp : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
  uppercaseRegExp : /(?=.*?[A-Z])/,
  lowercaseRegExp : /(?=.*?[a-z])/,
  digitsRegExp : /(?=.*?[0-9])/,
  specialCharRegExp : /(?=.*?[#?!@$%^&*-])/,
  spaceRegExp: /\s/,
  phoneValidationRegExp: /^\d{10}$/,
  zipCodeRegExp: /^\d{6}$/,
  addressRegexExp: /^[a-z0-9\s,'-]*$/
}

