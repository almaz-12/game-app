<script setup>
import AppHeader from './layouts/AppHeader.vue';
import BaseButton from './components/BaseButton.vue';
import CardItem from './components/CardItem.vue';
import { ref, onMounted } from 'vue';

const gameScore = ref(0);
const worldList = ref([]);

const isStart = ref(false);
const errorMessage = ref(null);
const isLoading = ref(false);

function startGame() {
  isStart.value = true;
  gameScore.value = 0;
}
function handleTrun(id) {
  const item = worldList.value.find(item => item.id === id);
  if(item) {
    item.state = 'opened';
  }
}
function handleSuccessResult(id) {
  if(gameScore.value < 0) return;
  gameScore.value++

  const item = worldList.value.find(item => item.id === id);
  if(item) {
    item.status = 'success';
  }
}
function handleFailedResult(id) {
  if(gameScore.value < 0) return;
  gameScore.value--

  const item = worldList.value.find(item => item.id === id);
  if(item) {
    item.status = 'failed';
  }
}

onMounted(async () => {
  try {
    errorMessage.value = null;
    isLoading.value = true;
    const response = await fetch('http://localhost:8080/api/random-words');

    if(!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`)

    const data = await response.json();

    if(data.length) {
      data.map((item,index) => {
        worldList.value.push({
          ...item,
          id: index,
          state: 'closed',
          status: 'pending',
        })
      })
    }

    return data;
  } catch (error) {
    errorMessage.value = error;
    throw error;
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <AppHeader :score="gameScore"/>
  <main class="main">
    <div v-if="isLoading">Загрузка игры...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <BaseButton v-else-if="!isStart" @click="startGame">
      Начать игру
    </BaseButton>
    <div class="game-box" v-else>
      <CardItem
      v-for="item in worldList"
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
  padding: 0 15px 50px;
}

.game-box {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
}
</style>
