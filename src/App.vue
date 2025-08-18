<script setup>
import AppHeader from './layouts/AppHeader.vue';
import BaseButton from './components/BaseButton.vue';
import CardItem from './components/CardItem.vue';
import { ref } from 'vue';

const isStart = ref(false);

function startGame() {
  isStart.value = true;
}
function handleTrun(data) {
  console.log(data);
}
function handleGetResult(data) {
  console.log(data);
}
</script>

<template>
  <AppHeader/>
  <main class="main">
    <BaseButton v-if="!isStart" @click="startGame">
      Начать игру
    </BaseButton>
    <CardItem v-else @show-answer="handleTrun" @process-result="handleGetResult"/>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  place-items: center;
  min-height: calc(100vh - 125px);
}
</style>
