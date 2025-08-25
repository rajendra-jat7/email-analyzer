import axios from 'axios';

const API = axios.create({
  baseURL: 'https://email-analyzer-x6qz.onrender.com',
});

export default API;
