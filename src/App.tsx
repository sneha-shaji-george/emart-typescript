import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import { fetchUserProfile } from "./Slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "./hooks/dispatchSelectorHooks";
import { router } from "./Pages/routes";


function App() {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const dispatch = useAppDispatch();

  const Profile = async () => {
    if (!(window.location.href === "http://localhost:3000/login" || window.location.href === "http://localhost:3000" || window.location.href === "http://localhost:3000/signup")) {
      const response = dispatch(fetchUserProfile());
      // dispatch(addUser(response.payload.payload));
    }
  }

  useEffect(() => {
    Profile();
  }, [userInfo]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;
