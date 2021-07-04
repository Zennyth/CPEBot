import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Home from '@/views/Home.vue';
import Grades from '@/views/Grades.vue';
import Settings from '@/views/Settings.vue';
import Account from '@/views/Account.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/grades',
    name: 'Grades',
    component: Grades
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const anonymousComponents = ['Login', 'Register'];

router.beforeEach((to, from, next) => {
  const publicRessource = anonymousComponents.includes(to.name);
  const isLoggedIn = store.getters.isLoggedIn;

  if(!publicRessource && !isLoggedIn) next({ name: 'Login' });
  else if(publicRessource && isLoggedIn) next({ name: 'Home' });
  else next();
});

export default router;
