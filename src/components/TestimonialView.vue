<template>
  <div id="testimonial">
    <div class="container">
      <!-- title -->
      <h1 class="page-title">OUR HAPPY CUSTOMERS</h1>
      <div class="card-container">
        <!-- scroll slider -->
      <carousel :per-page="4" :scroll-per-page="true"    paginationEnabled :gap="20" :autoplay="true" :autoplay-speed="30">
        <slide v-for="product in data" :key="product.id" class="product-card">
          <!-- datas -->
          <img :src="require(`@/assets/Images/${product.rating}`)" alt="Product rating" class="rating-img" />
          <div class="product-details">
            <h3>{{ product.name }}<span><img :src="require(`@/assets/Images/${product.tick}`)" alt="Product rating"  class="verify-user" /></span></h3>
            <p>{{ product.description }}</p>
          </div>
        </slide>
      </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import test from '../assets/test.json';  //import from json file
import { Carousel, Slide } from 'vue-carousel'; 
export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      data: test, //passing as data
    };
  },
};
</script>
