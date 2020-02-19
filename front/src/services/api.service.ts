import { Dispatch } from 'vuex';
import fetchApi from '@/utils/fetchApi';
import { AUTH_LOGOUT } from '@/store/actions';

export async function login(email: string, password: string) {
  const response = await fetchApi({
    method: 'post',
    url: '/login',
    data: { email, password },
  }).catch((err) => {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-refresh-token');
    throw err;
  });
  // login successful if there's a jwt token in the response
  if (response.data && response.data.token) {
    localStorage.setItem('user-token', response.data.token);
    localStorage.setItem('user-refresh-token', response.data.refreshToken);
    return response.data;
  }
  throw new Error("Unexpected error, can't get user token");
}

export function logout() {
  localStorage.removeItem('user-token');
  localStorage.removeItem('user-refresh-token');
}

export async function getUser() {
  const response = await fetchApi({ url: '/user' });
  return response.data;
}

export async function getTechnos(type: string) {
  const response = await fetchApi({ url: `/technos?type=${type}` });
  return response.data;
}

export async function postTechno(
  dispatch: Dispatch,
  {
    title,
    desc,
    id,
    img,
    type,
    tags,
  }: {
    title: string;
    desc: string;
    id: string;
    img: string;
    type: string;
    tags: string[];
  },
) {
  const token = localStorage.getItem('user-token');
  if (token === null) {
    throw new Error('Missing authentication token');
  }
  const formData = new FormData();
  formData.set('title', title);
  formData.set('desc', desc);
  formData.set('id', id);
  formData.set('type', type);
  tags.forEach((tag) => {
    formData.append('tags[]', tag);
  });
  formData.append('img', img);
  const response = await fetchApi({
    method: 'post',
    url: '/technos',
    data: formData,
    token,
  }).catch((err) => {
    if (err && err.message === 'logout') {
      dispatch(AUTH_LOGOUT);
      throw new Error('Veuillez vous reconnecter');
    }
    throw err;
  });
  return response.data;
}

export async function patchTechno(
  dispatch: Dispatch,
  {
    title,
    desc,
    id,
    img,
    type,
    tags,
  }: {
    title: string;
    desc: string;
    id: string;
    img: string;
    type: string;
    tags: string[];
  },
) {
  const token = localStorage.getItem('user-token');
  if (token === null) {
    throw new Error('Missing authentication token');
  }
  const formData = new FormData();
  formData.set('title', title);
  formData.set('desc', desc);
  formData.set('id', id);
  formData.set('type', type);
  tags.forEach((tag) => {
    formData.append('tags[]', tag);
  });
  formData.append('img', img);
  const response = await fetchApi({
    method: 'patch',
    url: '/technos',
    data: formData,
    token,
  }).catch((err) => {
    if (err && err.message === 'logout') {
      dispatch(AUTH_LOGOUT);
      throw new Error('Veuillez vous reconnecter');
    }
    throw err;
  });
  return response.data;
}

export async function postTag(
  dispatch: Dispatch,
  {
    name,
    color,
  }: {
    name: string;
    color: string;
  },
) {
  const token = localStorage.getItem('user-token');
  if (token === null) {
    dispatch(AUTH_LOGOUT);
    throw new Error('Veuillez vous reconnecter');
  }
  const response = await fetchApi({
    method: 'post',
    url: '/tags',
    data: { name, color },
    token,
  }).catch((err) => {
    if (err && err.message === 'logout') {
      dispatch(AUTH_LOGOUT);
      throw new Error('Veuillez vous reconnecter');
    }
    throw err;
  });
  return response.data;
}
export async function getTags() {
  const response = await fetchApi({
    method: 'get',
    url: '/tags',
  });
  return response.data;
}
