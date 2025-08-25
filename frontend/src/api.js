import axios from 'axios';

const API = axios.create({
  baseURL: 'https://email-analyzer-2nwi.onrender.com/',
});

export default API;
