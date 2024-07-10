<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <div class="navbar-desktop">
          <div class="title">
            <h1 class="brand-name" @click="goToProduct()">SHOP.CO</h1>
          </div>
          <!-- Nav Barlinks -->
          <div>
            <ul class="nav-links">
              <li v-for="link in links" :key="link.text">
                <div @click="handleNavClick(link)">
                  <h3>
                    {{ link.text }}
                    <i v-if="link.text === 'Shop'" class="fa-solid fa-caret-down"></i>
                  </h3>
                </div>
                <!-- Show dropdown menu for 'Shop' link -->
                <div v-if="dropdownVisible && link.text === 'Shop'" class="dropdown-menu">
                  <ul>
                    <li v-for="category in categories" :key="category.id" @click="navigateToCategory(category)">
                      {{ category.name }}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <!-- Search container -->
          <div class="search-container">
            <span class="fa fa-search search-icon"></span>
            <input type="text" name="search" placeholder="Search for products...">
          </div>
          <div class="icon-buttons">
            <button class="cart-button" @click="goToCart">
              <img src="../src/assets/Images/Frame.png" alt="" class="cart-img" />
              {{ cartCount }}
            </button>
          </div>
        </div>
        <!-- nav-bar mobile view -->
        <div class="navbar-mobile">
          <button @click="toggleMenu" class="toggle-button">&#9776;</button>
          <div class="title">
            <h1>shop.co</h1>
          </div>
          <span class="fa fa-search search-icon"></span>
          <div class="icon-buttons">
            <button class="cart-button" @click="goToCart">
              <img src="../src/assets/Images/Frame.png" alt="" class="cart-img" />
              {{ cartCount }}
            </button>
          </div>
        </div>
        <!-- nav-links toggle -->
        <div v-if="isMenuOpen" class="mobile-menu">
          <ul>
            <li v-for="link in links" :key="link.text">
              <div @click="handleNavClick(link)">
                <h3>{{ link.text }}</h3>
              </div>
              <div v-if="dropdownVisible && link.text === 'Shop'" class="dropdown-menu">
                <ul>
                  <li v-for="category in categories" :key="category.id" @click="navigateToCategory(category)">
                    {{ category.name }}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <!-- view content -->
      <router-view />
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      isMenuOpen: false,
      dropdownVisible: false,
      categories: [],
      links: [ //nav-links
        { text: 'Shop', path: '/shop' },
        { text: 'Onsale', path: '/topselling' },
        { text: 'New Arrivals', path: '/newarrival' },
        { text: 'Brands', path: '/' }
      ]
    };
  },
  computed: {
    ...mapGetters(['cartCount'])
  },
  methods: {
    async fetchCategories() {
      try { //api to fetch categories
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        this.categories = response.data.map(category => ({
          id: category,
          name: category.charAt(0).toUpperCase() + category.slice(1) // Capitalize category name
        }));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },// deopdown visible
    handleNavClick(link) {
      if (link.text === 'Shop') {
        this.dropdownVisible = !this.dropdownVisible;
      } else {
        this.navigateTo(link.path);
      }
    },
    async goToProduct() {
      if (this.$route.path !== '/') {
        this.$router.push(`/`);
      }
    },
    navigateTo(route) {
      if (this.$route.path !== route) {
        this.$router.push(route);
      }
    },//navigate category
    navigateToCategory(category) {
    const route = `/shop/${category.name}`;
    if (this.$route.path !== route) {
      this.$router.push(route);
    }
    this.dropdownVisible = false; // Hide the dropdown after navigating
  },
    goToCart() {
      this.$router.push('/cart');
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownVisible = false;
      }
    }
  },
  async created() {
    await this.fetchCategories();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
/* Add styles for the dropdown menu */
.dropdown-menu {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
  z-index: 1000; /* Ensure dropdown appears on top */
}

.dropdown-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu ul li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu ul li:hover {
  background-color: #f0f0f0;
}

/* Style for mobile view */
@media (max-width: 768px) {
  .dropdown-menu {
    position: relative; /* Ensure dropdown menu is within the mobile menu */
  }
}
</style>
