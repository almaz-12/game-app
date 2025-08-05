<script setup>
let item = 1;
let classRed = "red";
</script>

<template>
  <h1>Привет</h1>
  <main :class="`color-${classRed}`">Контент</main>
</template>

<style scoped>

</style>
