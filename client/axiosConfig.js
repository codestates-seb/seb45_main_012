import axios from 'axios';

axios.defaults.withCredentials = true;

const Instance = axios.create({
    baseURL: ''
})

export default Instance;