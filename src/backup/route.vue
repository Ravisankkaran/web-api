// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/HeroBar.vue';
import Product from './components/products/productBar.vue';
import Shop from './components/ShowBar.vue';
import Cart from './components/cartBar.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/shop',
    name: 'Shop',
    Component: Shop
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
];

const router = new VueRouter({
  routes
});

export default router;
