<template>
  <div id="hero">
    <div class="hero-section">
      <div class="hero-container">
        <div class="content">
          <!-- hero title -->
          <h1 class="title"><span>FIND CLOTHES <br></span><span>THAT MATCHES<br></span>YOUR STYLE</h1>
          <p class="hero-description">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <button class="hero-btn" @click="scrollToShowBar">Shop Now</button>
          <div class="stats">
            <!-- Sub title -->
            <ul class="count-list">
              <li class="count">200+</li>
              <li class="count-description">International Brand</li>
            </ul>
            <ul class="count-list">
              <li class="count">2,000+</li>
              <li class="count-description">High-quality Products</li>
            </ul>
            <ul class="count-list">
              <li class="count">30,000+</li>
              <li class="count-description">Happy Customers</li>
            </ul>
          </div>
        </div>
        <!-- hero image -->
        <div class="hero-div"><img src="@/assets/Images/hero.png" alt="" class="hero-img">
          <!-- <img src="@/assets/Images/Vector.png" alt="" class="vector-img"> -->
        </div>
      </div>
      <div class="banner-container">
        <!-- brand images -->
        <ul class="banner">
          <li><img src="@/assets/Images/brand2.png" alt="" class="banner-items"></li>
          <li><img src="@/assets/Images/brand5.png" alt="" class="banner-items"></li>
          <li><img src="@/assets/Images/brand3.png" alt="" class="banner-items"></li>
          <li><img src="@/assets/Images/brand4.png" alt="" class="banner-items"></li>
          <li><img src="@/assets/Images/brand1.png" alt="" class="banner-items"></li>

         
        
         
        </ul>
      </div>
    </div>
    <!-- router links for rest of the pages -->
    <ShowBar ref="showBar"></ShowBar>
    <BrowserBar></BrowserBar>
    <testimonialBar></testimonialBar>
    <footerBar></footerBar>
    
  </div>
</template>

<script>
// importing components
import ShowBar from '@/components/ShowView.vue'
import BrowserBar from '@/components/BrowserView.vue'
import testimonialBar from '@/components/TestimonialView.vue'
import footerBar from '@/components/FooterView.vue'
// import cart from '@/components/cartBar.vue'

export default {
  components: {
    ShowBar,
    BrowserBar,
    testimonialBar,
    footerBar,
    // cart,
  },
  methods: {
    // scroll function for show more button
    scrollToShowBar() {
    
      const showBarElement = this.$refs.showBar.$el;
      if (showBarElement) {
        showBarElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>


