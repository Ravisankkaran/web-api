<template>
  <div id="cart">
    <div>
      <h2 class="page-title">Your Cart</h2>
    </div>
    <div class="cart-container">
      <div class="cart-image">
        <!-- cart products  -->
        <div class="products-container">
          <div class="cart-products" v-for="product in cartProducts" :key="product.id">
            <!-- product image -->
            <div class="main-image">
              <img :src="product.image" alt="Main image" class="im1">
            </div>
            <div class="main-content">
              <!-- product information -->
              <div class="product-info">
                <h2 class="product-title">{{ product.title }}</h2>
                <h3 class ="product-price">${{ product.price }}</h3>
              </div>
              <div class="button-container">
                <button class="garbage-btn" @click="removeProduct(product.id)"><i class="fa-regular fa-trash-can"></i></button>
                <div>
                  <button class="add-button" @click="decrement(product.id)">-</button>
                  <span class="display">{{ product.quantity }}</span>
                  <button class="add-button" @click="increment(product.id)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- when no product is in cart -->
        <div v-if="cartProducts.length === 0">
          <h4>Your cart is empty</h4>
        </div>
      </div>
      <div class="cart-summary">
        <!-- cart bill -->
        <h2>Order Summary</h2>
        <div class="bill-subtotal">
          <div>
            <p>Subtotal</p>
          </div>
          <div>
            <p>${{ cartSubtotal.toFixed(2) }}</p>
          </div>
        </div>
        <div class="bill-discount">
          <div>
            <p>Discount (-20%)</p>
          </div>
          <div>
            <p>${{ cartDiscount.toFixed(2) }}</p>
          </div>
        </div>
        <div class="bill-delivery">
          <div>
            <p>Delivery Fee</p>
          </div>
          <div>
            <p>${{ deliveryFee.toFixed(2) }}</p>
          </div>
        </div>
        <hr>
        <div class="bill-total">
          <div>
            <p>Total</p>
          </div>
          <div>
            <p>${{ cartTotal.toFixed(2) }}</p>
          </div>
        </div>
        <div class="cupon-container">
          <!-- cupon field -->
          <input class="cupon-input" placeholder="Apply Coupon" type="text" v-model="couponCode" />
          <button class="cupon-btn" @click="applyCoupon">Apply</button>
        </div>
        <button class="check">Go To Checkout &rarr;</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      couponCode: '' // Initial state
    };
  },
  computed: { // computed properties
    ...mapGetters(['cartProducts', 'cartSubtotal', 'cartDiscount', 'cartTotal', 'deliveryFee'])
  },
  methods: {
    ...mapMutations(['REMOVE_FROM_CART', 'INCREMENT_QUANTITY', 'DECREMENT_QUANTITY', 'SET_DELIVERY_FEE']),
    removeProduct(productId) {
      this.REMOVE_FROM_CART(productId);
    },
    increment(productId) {
      this.INCREMENT_QUANTITY(productId);
    },
    decrement(productId) {
      this.DECREMENT_QUANTITY(productId);
    },
    applyCoupon() {
      if (this.couponCode.toUpperCase() === 'FREE') {
        this.SET_DELIVERY_FEE(0);
      } else {
        if(this.cartProducts.length === 0){
          this.SET_DELIVERY_FEE(0);
        }
        else{this.SET_DELIVERY_FEE(5);}
        
      }
    }
  }
};
</script>
