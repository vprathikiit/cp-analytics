import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = token;
    }
    return config;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const addProblem = (data) => API.post('/problems/add', data);
export const getAllProblems = () => API.get('/problems/all');

export const getDashboard = () => API.get('/analytics/dashboard');
export const getTopicStats = () => API.get('/analytics/topics');
export const getWeakTopics = () => API.get('/analytics/weak-topics');
export const getRevision = () => API.get('/analytics/revision');