import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/'
});

export default api;