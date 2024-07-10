<template>
    <div id="product-list">
      <h1 class="page-title">{{ title }}</h1>
      <ul class="product-list">
        <li v-for="product in limitedProducts" :key="product.id">
          <div class="product-items">
            <!-- routed according to product id  -->
             <div @click="goToProduct(product.id)" class="product-cart">
            <!-- <router-link :to="'/product/' + product.id">  -->
              <div>
                <img :src="getImageSrc(product.image, product.products)" alt="Product image" class="product-image" /> <!--Product image-->
              </div>
              <div>
                <h3 class="product-title">{{ product.title  }}</h3><!--product name-->
              </div>
              <div>
                <!-- <img :src="getRatingSrc(product.rating.rate, product.rating)" alt="Product rating" class="rating-img" /><br> -->
              </div>
              <div>
                <h3 class="product-price">$ {{ product.price }}</h3> <!--product price-->
              </div>
            <!-- </router-link> -->
            </div>
          </div>
        </li>
      </ul>
      <div class="view-button">
        <router-link :to="viewAllLink">
          <button class="view">View All</button> <!--View all button-->
        </router-link>
      </div>
      <!-- <hr class="hr-line"  /> -->
    </div>
  </template>
  
  <script>
  export default {
    props: { // sending pops to product page
      title: {
        type: String,
        required: true,
      },
      products: {
        type: Array,
        required: true,
      },
      viewAllLink: {
        type: String,
        required: true,
      },
      showDivider: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      limitedProducts() {
        return this.products.slice(0, 4); //limit product to 4 
      }
    },
    methods: {
      
      getImageSrc(image, productImage) {
        return image ? image : require(`@/assets/Images/${productImage}`); // Rendering image
      },
      getRatingSrc(rating, productRating) {
        return rating ? this.getRatingImage(rating) : require(`@/assets/Images/${productRating}`);
      },
      getRatingImage(rating) {
        const ratingRounded = Math.round(rating);
        return require(`@/assets/Images/rating-${ratingRounded}.png`);
      },
      goToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    }
    }
  };
  </script>
  