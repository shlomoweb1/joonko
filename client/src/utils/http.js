import axios from 'axios';
axios.defaults.withCredentials = true;

export const $http = axios.create({
    baseURL: 'http://localhost:3001/api/v1/',
    withCredentials: true,
})