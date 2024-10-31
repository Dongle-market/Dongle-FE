import axios from "axios";

export const Server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_LOCAL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})