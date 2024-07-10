<template>
    <div id="shop">
        <!-- title -->
      <h2>Category: {{ category }}</h2>
      <!-- display product -->
      <ul class="product-list">
      <li v-for="product in products" :key="product.id">
        <div  @click="goToProduct(product.id)" class="product-card">
            <!-- product-image -->
          <img :src="getImageSrc(product.image, product.products)" alt="Product image" class="product-image" />
          <div class="product-content">
            <!-- product-content -->
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-price">${{ product.price }}</p>
          </div>
       
      </div>
      </li>
    </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['category'],
    data() {
      return {
        products: [],// contains products
      };
    },
    async created() {
        
        console.log("fsdfsdfsdf", this.category);
      try {
        // get products of specific category
        const response = await axios.get(`https://fakestoreapi.com/products/category/${this.category.toLowerCase()}`);
        this.products = response.data;
        console.log(response);
      } catch (error) {
        console.error('Error fetching products for category:', error);
      }
    },
    watch: { // to render products
      $route() {
        this.fetchProducts();
      },
     
    },
    methods: {
        getImageSrc(image, productImage) {
            // image rendering
      return image ? image : require(`@/assets/Images/${productImage}`);
    },
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
      async fetchProducts() {
        console.log("")
        try { //fetch products
          const response = await axios.get(`https://fakestoreapi.com/products/category/${this.category.toLowerCase()}`);
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products for category:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
 
  </style>
  