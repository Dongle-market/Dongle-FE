import axios from "axios";

export const Server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER || 'http://localhost:4000/apis',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

Server.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  }
)