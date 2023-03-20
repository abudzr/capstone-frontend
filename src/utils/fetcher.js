import axios from 'axios';
import Cookies from 'js-cookie';
Cookies.HttpOnly = true;

const axiosCreate = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

async function callAPI({
  url,
  method,
  data,
  token,
  params,
  // serverToken,
}) {
  let headers = {
    'Access-Control-Allow-Origin': '*',
  };
  if (token) {
    headers = {
    ...headers,
    Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axiosCreate({
      url,
      method,
      data,
      headers,
      params,
    });

    if (response.status > 300) {
      const res = {
        error: true,
        message: response.data.statusMessage,
        data: null,
      };
      return res;
    }

    const res = response?.data;
    return res;
  } catch (error) {
    const res = {
      success: error?.status,
      message: error?.message
        ? error.message
        : 'Network error please try again',
    };
    return res;
  }
}
export default callAPI;
