import axios from 'axios';

const api = axios.create({
    baseURL: 'http://211.100.11.105:3333',
});

export default api;
