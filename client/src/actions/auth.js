import { AUTH, RESET, SUCCESS } from "../constants/actionTypes";
import {successToast, errorToast} from '../components/alert'
import * as api from "../api/index.js";


export const signin = ( formData, router ) => async ( dispatch ) => {
        try {
            const { data } = await api.signIn(formData)
                successToast('Your Acount Login Succesfully')
            dispatch({ type: AUTH, data});
            router.push('/');
        } catch (err) {
            errorToast(err.response.data.message , "Error")
        }
}

export const signup = ( formData, router ) => async ( dispatch ) => {
    try {
        const { data } = await api.signUp(formData)
            successToast('Your Acount sigup Succesfully')
        dispatch({ type: AUTH, data});
        router.push('/');
    } catch (err) {
        errorToast(err.response.data.message , "Error")//err.response.status
    }
}

export const forgotPassword  = (formData, router) => async(dispatch) => {
    try {
        const { data } = await api.resetPasswordforgot(formData)
        successToast('Your Password has been successfully changed')
        dispatch({ type: SUCCESS, data })
        router.push("/")
    } catch (error) {
        errorToast(error.response.data.message , "Error")
    }
}


export const resetPassword = (formData, router) => async(dispatch) => { 
    try {
        const { data } = await api.resetPasswordToken(formData);
        successToast('Your Password has been reset successfully')
        dispatch({ type: RESET, data })
        router.push("/")
    } catch (error) {
        errorToast(error.response.data.message , "Error")
    }
}