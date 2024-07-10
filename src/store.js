import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    deliveryFee: 0 // Initially zero
  },
  plugins: [VuexPersistedState()],
  mutations: {
    ADD_TO_CART(state, product) {
      const item = state.cart.find(item => item.id === product.id);
      if (item) {
        item.quantity++;
      } else { //when product is clicked on add-to-cart product is pushed
        state.cart.push({ ...product, quantity: 1 });
      }
      if (state.cart.length === 1) {
        state.deliveryFee = 5; // Set delivery fee when first product is added
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
      if (state.cart.length === 0) {
        state.deliveryFee = 0; // Reset delivery fee when cart is empty
      }
    },
    INCREMENT_QUANTITY(state, productId) {
      const item = state.cart.find(item => item.id === productId);
      if (item) {
        item.quantity++;
      }
    },
    DECREMENT_QUANTITY(state, productId) {
      const item = state.cart.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    SET_DELIVERY_FEE(state, fee) {
      state.deliveryFee = fee;
    }
  },
  getters: {
    cartCount(state) {
      return state.cart.length;
    },
    cartProducts(state) {
      return state.cart;
    },
    cartSubtotal(state) {
      return state.cart.reduce((total, product) => total + product.price * product.quantity, 0);
    },
    cartDiscount(state, getters) {
      return getters.cartSubtotal * 0.2; // 20% discount
    },
    cartTotal(state, getters) {
      return getters.cartSubtotal - getters.cartDiscount + state.deliveryFee;
    },
    deliveryFee(state) {
      return state.deliveryFee;
    }
  }
});
