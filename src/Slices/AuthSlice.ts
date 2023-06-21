import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData, getData } from "../Shared/Services";
import { FormData } from "../Components/UserManagement/SignUp";
import { authLogin, authProfile, logoutSession , signup } from "../Utils/config";

interface LoginPayloadType {
  username:string,  
  password: string
}

export const login = createAsyncThunk(
  "login/postRequestThunk",
  async (payload: LoginPayloadType  ) => await postData(`${authLogin}`, payload)
);

export const signUp = createAsyncThunk(
  "signUp/postRequestThunk",
  async (payload: FormData) => await postData(`${signup}`, payload)
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
} as LoginState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSessionOrNot: (state, action) => {
      state.inSession = false;
    }
  },
  extraReducers:(builder)=> {
    // eslint-disable-next-line
    builder.addCase(login.fulfilled, (state, action) => {
      state.userInfo = action.payload.data;
      state.isLoggedIn = true;
      state.inSession = true;
    }),
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload.data;
      state.isLoggedIn = true;
      state.profileChecking = false;
      state.inSession = true;
    }),
    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.profileChecking = true;
      state.inSession = true;
    }),
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.inSession = false;
    }),
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.inSession = false;
    })
  },
});

export const { setSessionOrNot } = authSlice.actions;
export default authSlice.reducer;
