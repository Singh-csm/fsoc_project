import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const successToast =function (message) {
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
 });
};

const errorToast =function (message) {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  export {
    successToast,errorToast
  }

  