import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData } from "../Shared/Services";
import { authLogin, authProfile, logoutSession , signup } from "../Utils/config";

export const login = createAsyncThunk(
  "login/postRequestThunk",
  async (payload) => await postData(`${authLogin}`, payload)
);

export const signUp = createAsyncThunk(
  "signUp/postRequestThunk",
  async (payload) => await postData(`${signup}`, payload)
);

export const fetchUserProfile = createAsyncThunk(
  "profile/getRequestThunk",
  async () => await getData(`${authProfile}`)
);

export const logout = createAsyncThunk(
  "logout/getRequestThunk",
  async () => await postData(`${logoutSession}`)
);

interface LoginState {
    userInfo : UserInfo,
    profile : Profile,
    isLoggedIn: boolean,
    profileChecking: boolean,
    inSession : boolean
}

interface UserInfo{
    expire : number,
    firstName : string,
    lastName : string,
    unfinishedOrder : UnfinishedOrder[]
}

interface Profile {
    id : string,
    firstName : string,
    lastName : string,
    email ? : string,
    number : string
}

interface UnfinishedOrder{
    address : string,
    billingAddress : string,
    grandTotal : string,
    id : string, 
    orderItems : OrderItems[],
    payment : string,
    status :  string,
    user : Profile
}

interface OrderItems{
    id : string,
    product : ProductType,
    quantity : string,
    total : string
}

interface ProductType{
    id : string,
    name : string,
    description : string,
    unit : string,
    inventory : string,
    price : string,
    rating : string,
    thumbnail :string,
    brand : string,
    discountPercentage :string,
    isActive : string,
}

const initialState = {
  userInfo: {},
  profile: {},
  isLoggedIn: false,
  profileChecking: false,
  inSession: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSessionOrNot: (state, action) => {
      state.inSession = false;
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.response;
      state.isLoggedIn = true;
      state.inSession = true;
    },
    [fetchUserProfile.fulfilled]: (state, { payload }) => {
      state.profile = payload.payload.user;
      state.isLoggedIn = true;
      state.profileChecking = false;
      state.inSession = true;
    },
    [fetchUserProfile.pending]: (state, { payload }) => {
      state.profileChecking = true;
      state.inSession = true;
    },
    [fetchUserProfile.rejected]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.inSession = false;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.inSession = false;
    }
  },
});

export const { setSessionOrNot } = authSlice.actions;
export default authSlice.reducer;
