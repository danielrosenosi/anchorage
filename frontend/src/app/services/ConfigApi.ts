import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        Authorization: `Bearer ${JSON.parse(String(localStorage.getItem('APP_ACCESS_TOKEN')))}`
    },
});

export default api;