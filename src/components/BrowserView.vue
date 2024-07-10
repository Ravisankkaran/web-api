
<template>
    <div id="browse-product">
      <div class="browse-container">
        <!-- title -->
        <h2 class="title">BROWSE BY DRESS STYLE</h2>
        <div class="browse-image">
<!-- fetch data from itens array -->
          <div class="item" v-for="item in items" :key="item.alt" >
            <img :src="item.src" :alt="item.alt" :class="item.class">
            <!-- <span>{{ item.alt }}</span> -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { src: require("../assets/Images/browser-1.png"), alt: "Casual" ,class:"casual-img" },
          { src: require("../assets/Images/browser-2.png"), alt: "Formal",class:"formal-img" },
          { src: require("../assets/Images/browser-3.png"), alt: "Party" ,class: "party-img" },
          { src: require("../assets/Images/browser-4.png"), alt: "Gym",class: "gym-img" }
        ]
      };
    }
  };
  </script>
  