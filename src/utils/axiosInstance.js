import axios from 'axios';
import { BASE_URL } from './config';

console.log(BASE_URL, 'API_BASEURL');
const baseURL = BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    let {
      headers: {  },
    } = config;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return Promise.resolve(response.data);
  },
  function (error) {
    // Do something with response error
    console.log(error, 'errorcccc');
    let { response } = error;
    if (response.status === 0) {
      return Promise.reject(error);
    }
    return Promise.resolve(response.data);
  },
);

export default axiosInstance;
