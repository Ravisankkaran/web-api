<template>
  <div id="product-view">
    <!-- getting details from data and display -->
    <h1 class="page-title">Top Selling</h1>
    <ul class="product-list">
      <li v-for="product in limitedProducts" :key="product.id">
        <div  @click="goToProduct(product.id)" class="product-card">
          <img :src="getImageSrc(product.image, product.products)" alt="Product image" class="product-image" />
          <div class="product-content">
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
  data() {
    return { // store product as array
      products: [],
    };
  },
  computed: {
    limitedProducts() {
      return this.products.slice(0, 10); // limiting product from id-10 to 20
    }
  },
  methods: {
    getImageSrc(image, productImage) {
      return image ? image : require(`@/assets/Images/${productImage}`);
    },
    fetchProducts() {
      axios.get('https://fakestoreapi.com/products')
        .then(response => {
        
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error); // Debugging line
        });
    },
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>
