<template>
    <div id="display-product">
      <!-- using prop and displaying content -->

      <ProductList
        title="NEW ARRIVALS"
        :products="products"
        viewAllLink="/newarrival"
      />
      <hr>
      <ProductList
        title="TOP SELLING"
        :products="products"
        viewAllLink="/topselling"
       
      />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ProductList from './ProductList.vue';
  
  export default {
    components: {
      ProductList,// import product details from productlist
    },
    data() {
      return {
        products: [], // saving products-details in array
      };
    },
    created() {
      axios.get('https://fakestoreapi.com/products') //using axion fetching api data
        .then(response => {
         
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error); // Debugging line
        });
    }
  };
  </script>
 <style scoped>
*{
  margin-left: 40px;
  margin-right: 30px;
}
  </style>