import { AUTH } from "../constants/actionTypes";
import {successToast, errorToast} from '../components/alert'
import * as api from "../api/index.js";

export const signin = ( formData, router ) => async ( dispatch ) => {
        try {
            const { data } = await api.signIn(formData)
                successToast('Your Acount Login Succesfully')
            dispatch({ type: AUTH, data});
            router.push('/');
        } catch (err) {
            errorToast(err.response.data.message , "Error")//err.response.status
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