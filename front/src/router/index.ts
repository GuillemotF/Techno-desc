import Vue from 'vue';
import VueRouter, { NavigationGuard } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ItemListPage from '../views/TechnoListPage.vue';
import LoginPage from '../views/LoginPage.vue';
import CreateTechnoPage from '../views/CreateTechnoPage.vue';
import CreatePage from '../views/CreatePage.vue';
import CreateTagPage from '../views/CreateTagPage.vue';
import store from '../store';

const redirectIfAuth: NavigationGuard = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const redirectIfNotAuth: NavigationGuard = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/item-list',
      name: 'item-list',
      component: ItemListPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: redirectIfAuth,
    },
    {
      path: '/new',
      name: 'create-page',
      component: CreatePage,
      beforeEnter: redirectIfNotAuth,
    },
    {
      path: '/techno/new',
      name: 'create-techno',
      component: CreateTechnoPage,
      beforeEnter: redirectIfNotAuth,
    },
    {
      path: '/tag/new',
      name: 'create-tag',
      component: CreateTagPage,
      beforeEnter: redirectIfNotAuth,
    },
  ],
});
export default router;
