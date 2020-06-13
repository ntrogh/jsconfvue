<script>
export default {
  name: 'HeaderBarBrand',
};
</script>

<template>
  <div class="navbar-brand">
    <a
      class="navbar-item"
      href="https://vuejs.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i aria-hidden="true">
        <img class="image is-128x128" src="../assets/Koedo-logo.png"/>
      </i>
    </a>
    <router-link to="/" class="navbar-item nav-home">
      <img src="../assets/Koedo-title.png" />
      <!-- <span class="brand-first">KOEDOS</span> -->
      <!-- <span class="brand-second">AT</span>
      <span class="brand-third">HOME</span> -->
    </router-link>
  </div>
</template>
