<script setup>

import BaseButton from './BaseButton.vue';
import CardItem from './CardItem.vue';
const props = defineProps({
  data: {
    type: Array,
    default: [],
  }
})

const emits = defineEmits(['restart-game','handle-turn','success-action','failed-action'])
function restartGame() {
  emits('restart-game', true)
}
function handleTrun(id) {
  emits('handle-turn', id)
}
function handleSuccessResult(id) {
  emits('success-action', id)
}
function handleFailedResult(id) {
  emits('failed-action', id)
}
</script>

<template>
  <div class="game-area">
    <div class="game-box" v-if="props.data.length">
      <CardItem
        v-for="item in props.data"
        :key="item.id"
        :data="item"
        @open-card="handleTrun"
        @success-action="handleSuccessResult"
        @failed-action="handleFailedResult"
      />
    </div>
    <BaseButton @click="restartGame">Начать заново</BaseButton>
  </div>
</template>

<style scoped>

.game-box {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  margin-bottom: 40px;
}
.game-area {
  width: 100%;
  text-align: center;
}
</style>