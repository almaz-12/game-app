<script setup>
import AppHeader from './layouts/AppHeader.vue';
import BaseButton from './components/BaseButton.vue';
import CardItem from './components/CardItem.vue';
import { ref } from 'vue';

const gameScore = ref(0);
const data = ref([{
  id: 0,
  word: 'hello',
  translation: 'привет',
  state: 'closed',
  status: 'pending',
},{
  id: 1,
  word: 'apple',
  translation: 'яблоко',
  state: 'closed',
  status: 'pending',
},{
  id: 2,
  word: 'book',
  translation: 'книга',
  state: 'closed',
  status: 'pending',
},{
  id: 3,
  word: 'water',
  translation: 'вода',
  state: 'closed',
  status: 'pending',
}]);

const isStart = ref(false);

function startGame() {
  isStart.value = true;
  gameScore.value = 0;
}
function handleTrun(id) {
   console.log(id);
  const item = data.value.find(item => item.id === id);
  console.log(item);
  if(item) {
    item.state = 'opened';
  }
}
function handleSuccessResult(id) {
  if(gameScore.value < 0) return;
  gameScore.value++

  const item = data.value.find(item => item.id === id);
  if(item) {
    item.status = 'success';
  }
}
function handleFailedResult(id) {
  if(gameScore.value < 0) return;
  gameScore.value--

  const item = data.value.find(item => item.id === id);
  if(item) {
    item.status = 'failed';
  }
}
</script>

<template>
  <AppHeader :score="gameScore"/>
  <main class="main">
    <BaseButton v-if="!isStart" @click="startGame">
      Начать игру
    </BaseButton>
    <div class="game-box" v-else>
      <CardItem
      v-for="item in data"
      :key="item.id"
      :data="item"
      @open-card="handleTrun"
      @success-action="handleSuccessResult"
      @failed-action="handleFailedResult"
    />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: grid;
  place-items: center;
  min-height: calc(100vh - 125px);
  max-width: 1200px;
  margin: auto;
  padding: 0 15px;
}

.game-box {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
}
</style>
