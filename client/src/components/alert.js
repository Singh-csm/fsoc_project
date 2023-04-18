import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const successToast =function (message) {
  toast.success(message, {
    position: 'bottom-right',
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
      position: 'bottom-right',
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

  