import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";

function App() {
  const userInfo = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();

  const Profile = async () => {
    if (!(window.location.href === "http://localhost:3000/login" || window.location.href === "http://localhost:3000" || window.location.href === "http://localhost:3000/signup")) {
      const response = await dispatch(fetchUserProfile());
      dispatch(addUser(response.payload.payload));
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
