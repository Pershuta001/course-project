import axios from 'axios';

export default axios.create({
    baseURL: `http://192.168.0.107:8080`,
    headers: {'Authorization': localStorage.getItem('token')}
});