import * as api from './../api/index';
import { CREATE, DELETE, FETCH_ALL, UPDATE } from './../constants/actions';

export const createTask = (form) => async (dispatch) => {
    try {
        const { data } = await api.createTask(form);
        dispatch({ type: CREATE, payload: data });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const fetchTasks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTasks();
        const response = dispatch({ type: FETCH_ALL, payload: data });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const updateTask = (id, form) => async (dispatch) => {
    try {
        const { data } = await api.updateTask(id, form);
        const response = dispatch({ type: UPDATE, payload: data });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteTask(id);
        const response = dispatch({ type: DELETE, payload: data });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}