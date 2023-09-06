import axios from 'axios';
import { refresh } from './src/services/auth.login';

axios.defaults.withCredentials = true;

const Instance = axios.create({
    baseURL: '효성님이 전달해주셨어야 하는...',
});

Instance.interceptors.request.use(refresh)

export default Instance;