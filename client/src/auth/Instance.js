import axios from 'axios';

const Instance = axios.create({
    baseURL: `https://some-domain.com/api`
})

export default Instance;