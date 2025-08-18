<script setup>
import AppHeader from './layouts/AppHeader.vue';
import BaseButton from './components/BaseButton.vue';
</script>

<template>
  <AppHeader/>
  <main class="main">
    <BaseButton>
      Начать игру
    </BaseButton>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  place-items: center;
  min-height: calc(100vh - 125px);
}
</style>
