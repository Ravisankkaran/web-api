<template>
  <div id="product-page">
    <div class="block-container ">
      <!-- product-Image -->
    <div v-if="product" class="image-container ">
      <img :src="productImages" alt="Main-image" class="main-image">
    </div>
  
  <!-- if product exist in that id then display it -->
    <div v-if="product" class="card">
      <!-- product-content -->
      <div class="main-content">
        <div class="product-info">
          <!-- product-title -->
          <h2 class="product-title">{{ product.title }}</h2>

          <h3>${{ product.price }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <hr>
          <div class="main-button">
            <!-- when product is not added to cart this button will be visible  -->
            <div v-if="!isInCart">
              <button @click="addToCart" class="cart-btn">Add To Cart</button>
            </div>
            <div v-else>
              <!-- when product is  added to cart this button will be visible -->
              <div class="button-container">
                <div>
                  <button class="add-button" @click="decrement(product.id)">-</button>
                  <span class="quantity-count">{{ getProductQuantity(product.id) }}</span>
                  <button class="add-button" @click="increment(product.id)">+</button>
                </div>
              </div>
              <!-- visible when produt added to cart -->
              <p>Product added to cart!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- while loading data while api call -->
      <p>Loading product data...</p>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      product: null,//initially product is empty
      productImages: [],
      count: 0, //initial count is 0
      isInCart: false // Track if product is in cart
    };
  },
  computed: {
    ...mapGetters(['cartProducts'])
  },
  methods: {
    // update cart_funtcion, increment,decrement
    ...mapMutations(['ADD_TO_CART', 'INCREMENT_QUANTITY', 'DECREMENT_QUANTITY']),
    async loadProductData() {
      const productId = this.$route.params.id;
      try {
        // fetch product from fake store API
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        this.product = response.data;
        this.productImages = [this.product.image];
        this.checkIfInCart(this.product.id); // Check if the product is in the cart
      } catch (error) {
        // if fetch is not done throw error
        console.error('Error fetching product data:', error);
      }
    },// check the state of product
    checkIfInCart(productId) {
      const productInCart = this.cartProducts.find(p => p.id === productId);
      if (productInCart) {
        this.isInCart = true;
        this.count = productInCart.quantity;
      } else {
        this.isInCart = false;
      }
    },
    increment(productId) {
      this.INCREMENT_QUANTITY(productId);
      this.count++;
    },
    decrement(productId) {
      this.DECREMENT_QUANTITY(productId);
      this.count--;
    },
    addToCart() {
      const productToAdd = { ...this.product, quantity: this.count + 1 };
      this.ADD_TO_CART(productToAdd);
      this.count += 1;
      this.isInCart = true; // Mark product as added to cart
    },
    getProductQuantity(productId) {
      const product = this.cartProducts.find(p => p.id === productId);
      return product ? product.quantity : 0;
    }
  },
  created() {
    this.loadProductData();
  }
};
</script>
