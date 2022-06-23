import {login} from "../controller/administrator";


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('username');
        localStorage.removeItem('contact');
        localStorage.removeItem('level');
        localStorage.removeItem('authenticated');
        dispatch(receiveLogout());
    };
}


// export const loginUser = async (creds) => {
export function loginUser(creds)  {

    return async (dispatch) => {

        dispatch(receiveLogin());

        if (creds.username.length > 0 && creds.password.length > 0) {
            const result = await login(creds.username, creds.password);

            if (result === true) {
                localStorage.setItem('authenticated', true); 
                window.location.reload(false);
            }  else {
                dispatch(loginError('Identifiants incorrects! Veuillez reesayer..'));
            }
                        
        } else {
            dispatch(loginError('Veuillez renseigner tous les champs!'));
        }
    }
}
