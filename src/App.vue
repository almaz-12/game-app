<script setup>
import BaseButton from './components/BaseButton.vue';
</script>

<template>
  <BaseButton>
    Начать игру
  </BaseButton>
  <p>{{ new Date().toLocaleString() }}</p>
</template>

<style scoped>

</style>
