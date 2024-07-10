<template>
  <div id="footer">
    <div class="footer-container">
      <div class="colour-container">
      <div class="news-letter">
        
        <!-- news letter -->
        <div class="news-container">
          <div class="title">
            <h1 class="news-title">STAY UP TO DATE ABOUT<br> OUR LATEST OFFERS</h1>
          </div>
          <!-- input mail -->
          <div class="input-box">
            <div class="input-mail">
              <span class="icon-container"><i class="fa-regular fa-envelope"></i></span>
              <input placeholder="Enter your email address"/>
            </div>
            <div>
              <button class="subscribe">Subscribe to Newsletter</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- footer links -->
      <div class="footer-link">
        <div class="brand-container">
          <h3 class="brand-title">SHOP.CO</h3>
          <p class="brand-description">We have clothes that suit your style and which you’re proud to wear. From women to men.</p>
        </div>
        <div class="section" v-for="(section, index) in sections" :key="index">
          <h3 class="section-title">{{ section.title }}</h3>
          <!-- render footer links using for loop -->
          <p v-if="section.description" class="section-description">{{ section.description }}</p>
          <ul class="list-container" v-else>
            <li class="list-item" v-for="(item, idx) in section.items" :key="idx">{{ item }} </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      sections: [// pass as array
        {
          title: "COMPANY",
          items: ["About", "Features", "Works", "Career"]
        },
        {
          title: "HELP",
          items: ["Customer Support", "Delivery Details", "Terms and Condition", "Privacy policy"]
        },
        {
          title: "FAQ",
          items: ["Account", "Manage Deliveries", "Orders", "Payments"]
        },
        {
          title: "RESOURCES",
          items: ["Free Books", "Development Tutorials", "How to-Blog", "You-tube Playlist"]
        }
      ]
    };
  }
};
</script>

<style scoped>
  .input-mail {
  position: relative;
  color: #181717;
  font-size: 16px;
}
.input-mail input {
  padding: 20px 110px;
  width: 335px;
  font-size: 18px;
  background: #fcfcfc;
  border: 1px solid #aaa;
  border-radius: 50px;
  box-shadow: 0 0 3px #ccc;
  padding-left: 50px; 
}
.icon-container {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #aaa;
}
.section-title {
  font-weight: bolder;
  font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
}
.brand-container {
  display: block;
}
.list-container {
  padding: 1px;
  list-style-type: none;
}
.list-item{
  color: #aaa;
  font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  font-size: 15px;
  padding: 10px;
}
.brand-title {
  font-family: "Archivo Black", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 39px;
  margin: 0%;
}
.news-title {
  font-family: "Archivo Black", sans-serif;
  font-weight: 400;
  font-size: 48px;
  font-style: normal;
}
.section-description {
  max-width: 250px;
  color: #aaa;
  font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
}
.brand-description {
  max-width: 250px;
  color: #aaa;
  font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;

}
.section {
  min-width: none;
}
/* * {
  font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
} */
.title {
  color: white;
  font-weight: bold;
  font-size: 20px;
  padding: 30px;
}
.news-letter {
  margin-left: 100px;
  margin-right: 100px;
  
}
.colour-container{
  background-image: linear-gradient(180deg, rgb(255, 255, 255) 50%, #F0F0F0 50%);


}
.news-container {
  background-color: black;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 30px;
}
.input-box {
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 50px;
}
.subscribe {
  padding: 20px 115px;
  width: 500px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 50px;
  border: 1px solid black;
}
.footer-link {
  display: flex;
  justify-content: space-between;
  margin-left: 90px;
  margin-right: 70px;
  padding: 20px;
  flex-wrap: wrap;
}
.footer-container {
  background-color: #F0F0F0;
  margin-top: 20px;
}
@media (max-width: 768px) {
  .news-letter {
    margin-left: 20px;
    margin-right: 20px;
  }
  .news-container {
    flex-direction: column;
    align-items: center;
  }
  .input-box {
    padding: 20px;
    margin-right: 0;
    width: 100%;
  }
  .subscribe {
    padding: 10px 50px;
  }
  .input-mail input {
    padding: 10px 50px;
  }
  .footer-link {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    justify-items: center;
  }
  .footer-link > .section {
    flex: 1 1 45%;
    text-align: center;
  }
  .title h1 {
    font-size: 18px;
    text-align: center;
  }

}
</style>
