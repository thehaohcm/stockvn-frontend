<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" alt="Vue logo" style="width: 40px; margin-left: 25px;">
      </a>
      <button class="navbar-toggler" type="button" @click="toggleMenu" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav">
          
        </ul>
      </div>
    </div>
  </nav>
  <div class="text-center mt-3">
      <h2>Disclaimer</h2>
      <p>The information and indicators on this website reflect the owner's views and should not be taken as investment
        advice.
      </p>
  </div>
  <hr />
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
  },
  setup() {
    const isMenuOpen = ref(false);
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    
    onMounted(() => {
      
    });

    return {
      isMenuOpen,
      toggleMenu
    };
  },
};
</script>

<style scoped>
/* Add scoped to limit the styles to this component */
.nav-link {
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 0.25rem;
  margin: 0 2px;
}

.nav-item {
  width: 150px; /* Adjust as needed */
  text-align: center;
}

.nav-link:hover {
  background-color: #2d3748; /* Dark background for active tab */
  color: white;
  border-bottom: 2px solid #6cb2eb; /* Highlight active tab */
  font-weight: bolder;
}

.user-info {
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0; /* Align to the right */
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>