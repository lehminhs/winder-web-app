import axios from 'axios';

const API = axios.create({ baseURL: 'https://winder-backend.herokuapp.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchTasks = () => API.get('/tasks');
export const createTask = (newTask) => API.post('/tasks/create', newTask);
export const updateTask = (id, updatedTask) => API.patch(`/tasks/update/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/delete/${id}`);

export const signIn = (form) => API.post('/user/signin', form);
export const signUp = (form) => API.post('/user/signup', form);
export const fetchUsers = () => API.get('/user');
export const fetchUser = (id) => API.get(`/user/${id}`);