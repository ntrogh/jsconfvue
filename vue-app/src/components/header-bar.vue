<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';

export default {
  name: 'HeaderBar',
  components: { HeaderBarBrand },
};
</script>

<template>
  <header>
    <nav
      class="navbar is-white"
      role="navigation"
      aria-label="main navigation"
    >
      <HeaderBarBrand></HeaderBarBrand>
    </nav>
  </header>
</template>
