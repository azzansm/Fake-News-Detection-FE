import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.232.63.72:8000', // Replace with your backend URL
});

export default api;
