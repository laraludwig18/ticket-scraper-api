import axios from 'axios';
import ticketApi from '.';

const ticketAuthApi = axios.create({
  baseURL: process.env.TICKET_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

ticketAuthApi.interceptors.response.use(
  response => {
    const {
      data: { access_token: token },
    } = response;

    ticketApi.defaults.headers.Authorization = `Bearer ${token}`;

    return response;
  },
  async err => Promise.reject(err),
);

export default ticketAuthApi;
