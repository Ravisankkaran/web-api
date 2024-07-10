import Vue from 'vue';
import Router from 'vue-router';
import home from './components/HeroView.vue';
import productbar from './components/products/ProductPage.vue';
import Shop from './components/ShopView.vue';
import newarrival from './components/NewArrival.vue';
import topselling from './components/TopSelling.vue';
import cart from './components/CartView.vue';
import ShopCategory from './components/ShopCategory.vue'; // Import the ShopCategory component

Vue.use(Router);

const routes = [
  { path: '/', name: 'home', component: home },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    children: [
      {
        path: ':category',
        name: 'ShopCategory',
        component: ShopCategory,
        props: true
      }
    ]
  },
  { path: '/product/:id', name: 'Product', component: productbar },
  {
    path: '/newarrival',
    name: 'newarrival',
    component: newarrival
  },
  {
    path: '/topselling',
    name: 'topselling',
    component: topselling
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  }
];

const router = new Router({
  mode: 'history',
  routes
});

export default router;
