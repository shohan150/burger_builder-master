import axios from "axios";
import * as actionType from './actionType'


export const auth_success = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }

    }



}
export const authLoading = isloading => {
    return {
        type: actionType.AUTH_LOADING,
        payload: isloading

    }
}
export const authFaild = errMsg => {
    return {
        type: actionType.AUTH_FAILED,
        payload: errMsg
    }
}
export const auth_logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiresIn')
    localStorage.removeItem('userId')
    return {
        type: actionType.AUTH_LOGOUT
    }
}


export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true))
    const authData = {
        email: email,
        password: password,
        mode: mode,
        returnSecureToken: true,

    }


    let auth_url = null;
    if (mode === 'Sign Up') {
        auth_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
    } else {
        auth_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }

    const API_KEY = "AIzaSyC6OBrmE7WLy1w6Y2jJhvA_Hup6Xi8PvU8"
    axios.post(auth_url + API_KEY, authData)
        .then(response => {
            dispatch(authLoading(false))

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId)
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('expirationTime', expirationTime)
            dispatch(auth_success(response.data.idToken, response.data.localId))
        })
        .catch(err => {

            dispatch(authLoading(false))

            console.log(err.response.data.error.message)
            let errorM = err.response.data.error.message
            dispatch(authFaild(errorM))
        })
}


export const auth_Checking = () => (dispatch) => {

    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(auth_logout())
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            dispatch(auth_logout())
        }
        const userId = localStorage.getItem('userId')
        dispatch(auth_success(token, userId))
    }



}