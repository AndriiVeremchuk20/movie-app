import axios from "axios";

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default client;
