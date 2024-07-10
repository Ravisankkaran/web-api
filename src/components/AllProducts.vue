<template>
  <div id="all-product">
    <h1 class="page-title">All Products</h1>
    <ul class="product-list">
      <!-- display product using for satement -->
      <li class="product-container" v-for="product in products" :key="product.id">
        <div class="product-items">
          <!-- routng to specific product id -->
           <div @click="goToProduct(product.id)" class="product-card">
            <img :src="product.image" alt="Product image" class="product-image"/><br>
            <h3 class="product-title">{{ product.title }}</h3>
            <h3 class="product-price">${{ product.price.toFixed(2) }}</h3><br>
        </div>
        </div>  
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: []
    };
  },
  methods:{
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    }
  },
  async created() {
    try {
      // Fetch the products from Fake Store API
      const response = await axios.get('https://fakestoreapi.com/products');
      // Update the products data
      console.log( response.status)
      if (response.status === 200) {
      this.products = response.data;
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
};
</script>
