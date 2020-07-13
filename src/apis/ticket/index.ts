import axios from 'axios';

const ticketApi = axios.create({
  baseURL: process.env.TICKET_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default ticketApi;
