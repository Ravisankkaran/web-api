<template>
    <div class="root">
      <div class="img">
        <div class="side-images">
          <ul>
            <li v-for="image in productImages" :key="image">
              <img 
                :src="require(`@/assets/Images/${image}`)" 
                alt="Product image"
                @click="updateMainImage(image)"
              />
            </li>
          </ul>
        </div>
        <div class="main-image">
          <img :src="require(`@/assets/Images/${mainImage}`)" alt="Main image" class="im1">
        </div>
      </div>
      <div class="main-content">
        <div class="product-info">
          <h2>{{ product.name }}</h2>
          <img :src="require(`@/assets/Images/${product.rating}`)" alt="Product rating" class="rating"/>
          <h3>{{ product.price }} <span style="text-decoration: line-through; color: darkgrey;">{{ product.pricediscount }}</span></h3>
          <p>{{ product.description }}</p>
          <hr>
          <p style="color: darkgray;">{{ product.select }}</p>
          <img :src="require(`@/assets/Images/${product.color1}`)" alt="Product color" class="rating" style="width: 18%;"/>
          <hr>
          <p>Choose Size</p>
          <div class="size">
            <button class="size-but">Small</button>
            <button class="size-but">Medium</button>
            <button class="size-but">Large</button>
            <button class="size-but">X-Large</button>
          </div>
          <hr>
          <div class="add">
            <div class="but">
              <div class="button-container">
                <button @click="decrement">-</button>
                <span class="display">{{ count }}</span>
                <button @click="increment">+</button>
              </div>
            </div>
            <button @click="addToCart" class="cart">Add To Cart</button>
            <div class="cart">
              <router-link :to="'/cart/' + product.id">
              <p>Cart({{ cart }})</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import sourceData from '../../assets/product.json';
  
  export default {
    data() {
      return {
        product: null,
        mainImage: '',
        productImages: [],
        count: 0,
        cart: 0
      };
    },
    created() {
      this.loadProductData();
    },
    methods: {
      loadProductData() {
        const productId = parseInt(this.$route.params.id);
        this.product = sourceData.find(p => p.id === productId);
        this.mainImage = this.product.products; // Set main image initially
        // Set product images for side gallery
        this.productImages = [this.product.pr, this.product.pro, this.product.prod];
      },
      increment() {
        this.count++;
      },
      decrement() {
        if (this.count > 0) {
          this.count--;
        }
      },
      addToCart() {
        this.cart += 1;
      },
      updateMainImage(imageName) {
        this.mainImage = imageName;
      },
      getImageUrl(imageName) {
        return require(`@/assets/Images/${imageName}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .root{
    display: flex;
  }
  .but{
    display: flex;
    /* justify-content: space-evenly; */
    /* width: 500px; */
  }
  .button-container{
    background-color: #F0F0F0;
    color: black;
    padding: 10px 50px;
    border-radius: 50px;
    font-size: 16px;
    border: none;
   
  }
  button{
    cursor: pointer;
  }
  .button-container button {
  width: 40px;
  height: 40px;
  font-size: 22px;
  margin: 5px;
  border:none;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  }
  
  li{
    display: inline;
  }
  .rating{
    /* padding: 20px 30px; */
    width: 10%;
  }
  .cart{
    padding: 20px 50px;
    background-color: black;
    color: azure;
    font-size: 16px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
  }
  .side-images {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 100px;
    padding: 50px;
    justify-content: space-evenly;
  }
  .size{
    display: flex;
    padding: 10px;
    gap:20px;
  }
  .size-but{
    border: none;
    border-radius: 50px;
    background-color: darkgray;
    color: gray;
    font-size: 16px;
    padding: 20px 40px;
  }
  .size-but:hover{
    background-color: black;
    color: aliceblue    ;
  }
  .img {
    display: flex;
    padding: 50px;
  }
  .main-image {
    padding: 50px;
    gap: 20px;
    display: flex;
    justify-content: space-evenly;
  
  }
  .im1 {
    width: 500px;
  }
  .main-content{
   padding: 50px;
  }
  .add{
    display: flex;
    justify-content: space-evenly;
    
  }
  </style>
  
  