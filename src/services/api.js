import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.56.1:8000/predict', // Replace with your backend URL
});

export default api;
