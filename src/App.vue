<script setup>
import AppHeader from './layouts/AppHeader.vue';
import BaseButton from './components/BaseButton.vue';
import CardItem from './components/CardItem.vue';
import { ref } from 'vue';

const gameScore = ref(0);
const data = ref({
  word: 'hello',
  translation: 'привет',
  state: 'closed',
  status: 'pending',
});

const isStart = ref(false);

function startGame() {
  isStart.value = true;
}
function handleTrun(data) {
  console.log(data);
}
function handleGetResult(data) {
  console.log(data);
  if(gameScore.value < 0) return;
  (data === 'success') ? gameScore.value++ : gameScore.value--
}
</script>

<template>
  <AppHeader :score="gameScore"/>
  <main class="main">
    <BaseButton v-if="!isStart" @click="startGame">
      Начать игру
    </BaseButton>
    <CardItem v-else :data="data" @show-answer="handleTrun" @process-result="handleGetResult"/>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  place-items: center;
  min-height: calc(100vh - 125px);
}
</style>
