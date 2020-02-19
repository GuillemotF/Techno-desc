import Vue from 'vue';
import Vuex from 'vuex';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  ADD_TAG,
  REMOVE_TAG,
  CLEAN_TAGS,
  POST_TECHNO,
  POST_TAG,
  PATCH_TECHNO,
  GET_TAGS,
  SET_TAGS,
} from './actions';
import { login, logout, postTechno, postTag, patchTechno, getTags } from '../services';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    activeTags: [] as string[],
    tags: {} as App.Tags,
    userToken: localStorage.getItem('user-token'),
    status: '',
  },
  getters: {
    isAdmin: (state) => !!state.userToken,
    isAuthenticated: (state) => !!state.userToken,
    authStatus: (state) => state.status,
    getTags: (state) => state.tags,
    getActiveTags: (state) => state.activeTags,
    getUserToken: (state) => state.userToken,
  },
  mutations: {
    [SET_TAGS]: (state, tags: App.Tag[]) => {
      const tagsObj = {} as App.Tags;
      tags.forEach((tag) => {
        tagsObj[tag.name] = tag;
      });
      state.tags = tagsObj;
    },
    [ADD_TAG]: (state, tag: string) => {
      state.activeTags.push(tag);
    },
    [REMOVE_TAG]: (state, tag: string) => {
      state.activeTags = state.activeTags.filter((activeTag) => activeTag !== tag);
    },
    [CLEAN_TAGS]: (state) => {
      state.activeTags = [];
    },
    [AUTH_LOGOUT]: (state) => {
      state.userToken = null;
    },
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading';
    },
    [AUTH_SUCCESS]: (state, userToken) => {
      state.status = 'success';
      state.userToken = userToken;
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    [ADD_TAG]: ({ commit }, tag: string) => {
      commit(ADD_TAG, tag);
    },
    [REMOVE_TAG]: ({ commit }, tag: string) => {
      commit(REMOVE_TAG, tag);
    },
    [CLEAN_TAGS]: ({ commit }) => {
      commit(CLEAN_TAGS);
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      commit(AUTH_LOGOUT);
    },
    [AUTH_SUCCESS]: ({ commit }, userToken) => {
      commit(AUTH_SUCCESS, userToken);
    },
    [AUTH_ERROR]: ({ commit }) => {
      commit(AUTH_ERROR);
    },
    [AUTH_REQUEST]: async ({ commit }, { email, password }) => {
      commit(AUTH_REQUEST);
      const response = await login(email, password).catch((err) => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem('user-token');
        throw err;
      });
      commit(AUTH_SUCCESS, response);
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      commit(AUTH_LOGOUT);
      return logout();
    },
    [POST_TAG]: ({ dispatch }, { name, color }) => {
      return postTag(dispatch, { name, color });
    },
    [GET_TAGS]: ({ commit }) => {
      return getTags().then((res) => {
        commit(SET_TAGS, res);
      });
    },
    [POST_TECHNO]: ({ dispatch }, { title, id, desc, type, img, tags }) => {
      return postTechno(dispatch, { title, id, desc, type, img, tags });
    },
    [PATCH_TECHNO]: ({ dispatch }, { title, id, desc, type, img, tags }) => {
      return patchTechno(dispatch, { title, id, desc, type, img, tags });
    },
  },
  modules: {},
});
