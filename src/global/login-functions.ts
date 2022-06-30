import { Login } from '../types/login.types';

export const setSession = (obj: Login): void => {

    const { login, token, user } = obj

    const loginState = login ? 'true' : 'false';
    const tokenState = token ? token : '';
    const userState = user ? user : 'null'
    sessionStorage.setItem('token', tokenState);
    sessionStorage.setItem('loginStatus', loginState);
    sessionStorage.setItem('user', userState)
}

export const getSession = (): Login => {
    const tokenState = sessionStorage.getItem('token');
    const loginState = sessionStorage.getItem('loginStatus') === 'true' ? true : false;
    const token = tokenState === undefined ? null : tokenState;
    const user = sessionStorage.getItem('user');

    return {
        login: loginState,
        token,
        user
    }
}