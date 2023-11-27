import axios from 'axios';

export default axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? `${window.location.protocol}////${window.location.hostname}:3000`
      : 'EnterProdURL',
});

// Private route
export const privateAxios = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? `${window.location.protocol}////${window.location.hostname}:3000`
      : 'EnterProdURL',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});