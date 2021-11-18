import * as api from './../api/index'
import { AUTH, FETCH, FETCH_ALL } from './../constants/actions'

export const signIn = (form, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(form);
        dispatch({ type: AUTH, data })
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (form) => async () => {
    try {
        const { data } = await api.signUp(form);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export const fetchUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        const response = dispatch({ type: FETCH_ALL, payload: data });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const fetchUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id);
        const response = dispatch({ type: FETCH, payload: data });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}