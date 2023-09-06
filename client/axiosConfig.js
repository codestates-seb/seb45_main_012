import axios from 'axios';
import { refresh, refreshErrorHandle } from './src/services/auth.login';

axios.defaults.withCredentials = true;

const Instance = axios.create({
    baseURL: '',
});

Instance.interceptors.request.use(refresh, refreshErrorHandle)
export default Instance;