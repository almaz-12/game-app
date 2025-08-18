<script setup>
import AppScore from '../components/AppScore.vue';
</script>

<template>
  <header class="header">
    <div class="header__logo">ЗАПОМНИ СЛОВО</div>
    <AppScore score="0"/>
  </header>
</template>

<style scoped>
.header {
  max-width: 1200px;
  padding: 37px 15px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
}
.header__logo {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 12%;
  color: #222222;
}
</style>