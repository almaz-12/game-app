<script setup>
import AppHeader from './layouts/AppHeader.vue';
import BaseButton from './components/BaseButton.vue';
import GameArea from './components/GameArea.vue';
import { ref, onMounted } from 'vue';
import { API_ENDPOINT, SCORE_FAIL, SCORE_SUCCESS, STATE_OPENED, STATE_START, STATUS_FAILED, STATUS_START, STATUS_SUCCESS } from './common/constants';
import { findItemById } from './composables/common';

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
  const item = findItemById(worldList, id);
  if(item) {
    item.state = STATE_OPENED;
  }
}
function handleSuccessResult(id) {
  if(gameScore.value < 0) return;

  const item = findItemById(worldList, id);

  if (!item || item.status !== STATUS_START) return;

  gameScore.value += SCORE_SUCCESS
  item.status = STATUS_SUCCESS;
}
function handleFailedResult(id) {
  if(gameScore.value < 0) return;

  const item = findItemById(worldList, id);

  if (!item || item.status !== STATUS_START) return;

  gameScore.value -= SCORE_FAIL
  item.status = STATUS_FAILED
}

async function handleRestart() {
  isStart.value = true;
  gameScore.value = 0;
  await fetchData();
}

async function fetchData() {
  try {
    errorMessage.value = null;
    isLoading.value = true;
    worldList.value = [];
    const response = await fetch(`${API_ENDPOINT}/random-words`);

    if(!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`)

    const data = await response.json();

    if (!data || !data.length) {
      errorMessage.value = 'Не получены данные для игры';
      return [];
    }

    if(data.length) {
      worldList.value = data.map((item, index) => ({
        ...item,
        id: index,
        state: STATE_START,
        status: STATUS_START,
      }));
    }

    return data;
  } catch (error) {
    errorMessage.value = error;
    throw error;
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchData();
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
    <GameArea
      v-else-if="worldList.length"
      :data="worldList"
      @handle-turn="handleTrun"
      @success-action="handleSuccessResult"
      @failed-action="handleFailedResult"
      @restart-game="handleRestart"
    />
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
</style>
