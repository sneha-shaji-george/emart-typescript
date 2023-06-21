import { Navigate } from "react-router-dom";
import {  useAppSelector } from "../../hooks/dispatchSelectorHooks";

/**
 * Component redirects to home when user logged in
 * @param {{ storageVar: string, elementToRender: JSX.Element }} param0 For checking localstorage and render
 * @returns JSX.Element
 */
export default function RedirectPage({ elementToRender }) {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

    if (!isLoggedIn) {
        return (elementToRender);
    }
    else {
        return (<Navigate to="/home" />);
    }
}