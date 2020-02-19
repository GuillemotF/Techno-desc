import axios from 'axios';

export default async function fetchApi({
  method = 'get',
  url,
  data,
  token,
}: {
  method?: 'get' | 'post' | 'patch';
  url: string;
  data?: any;
  token?: string;
}) {
  const response = await axios({
    method,
    url: process.env.VUE_APP_API_URL + url,
    data,
    headers: token && { Authorization: `bearer ${token}` },
    validateStatus: (status) => {
      return (status >= 200 && status < 300) || status === 401;
    },
  }).catch((err) => {
    if (err.response && err.response.data) {
      throw err.response.data;
    }
    throw err;
  });
  if (response.status === 401 && token) {
    // Refresh token
    const refreshToken = localStorage.getItem('user-refresh-token');
    if (!refreshToken) {
      throw new Error('Unable to get refresh token');
    }
    const refreshResponse = await axios({
      method: 'post',
      url: `${process.env.VUE_APP_API_URL}/refresh`,
      headers: { Authorization: `bearer ${refreshToken}` },
    }).catch((err) => {
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-refresh-token');
      throw new Error('logout');
    });
    localStorage.setItem('user-token', refreshResponse.data.token);
    localStorage.setItem('user-refresh-token', refreshResponse.data.refreshToken);
    // Retry request
    const responseAfterRefresh = await axios({
      method,
      url: process.env.VUE_APP_API_URL + url,
      data,
      headers: { Authorization: `bearer ${refreshResponse.data.token}` },
    }).catch((err) => {
      throw err.response.data;
    });
    if (responseAfterRefresh.status >= 400) {
      throw new Error(responseAfterRefresh.data.message);
    }
    return responseAfterRefresh;
  }
  if (response.status >= 400) {
    throw new Error(response.data.message);
  }
  return response;
}
