import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

/**
 * Display toast message
 * @param {string} message Text to display in toast
 */
export default function ToastMessage( status:string, message:string, position:any, autoClose:any, hideProgressBar:any ) {
    switch (status) {
        case "success":
            return toast.success(message, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: hideProgressBar,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        case "info":
            return toast.info(message, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: hideProgressBar,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        case "error":
            return toast.error(message, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: hideProgressBar,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        default:
            return null
    }

};