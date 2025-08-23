<script setup>
import { ref, onUnmounted } from 'vue';

import AppIcon from '../icons/AppIcon.vue';

const props = defineProps({
  data: {
    type: Object,
    require: true,
  }
})

const emits = defineEmits({
  'show-answer': (payload) => {
    return typeof payload === 'boolean'
  },
  'process-result': (payload) => {
    return ["success", "failed"].includes(payload)
  }
});

const isShowing = ref(false);
const isSuccess = ref(false);
const isFailed = ref(false);
const isAnimating = ref(false);

let animationTimer = null;

function handleTurn() {
  if (isAnimating.value) return; // ← блокируем повторные клики
  isAnimating.value = true;
  isShowing.value = true;
  emits('show-answer', true);

  if (animationTimer) clearTimeout(animationTimer);

  animationTimer = setTimeout(() => {
    isAnimating.value = false;
  }, 800);
}

function actionSuccess() {
  isSuccess.value = true;
  isFailed.value = false;
  emits('process-result', 'success');
}
function actionFailed() {
  isFailed.value = true;
  isSuccess.value = false;
  emits('process-result', 'failed');
}

onUnmounted(() => {
  if (animationTimer) clearTimeout(animationTimer);
});
</script>

<template>
  <div :class="['card', { 'active' : isShowing }]">
    <div class="card-face card-front" v-show="!isShowing">
      <div class="card__num">01</div>
      <div class="card__text"> {{ props.data.word }}</div>
      <button class="card__btn" @click="handleTurn">ПЕРЕВЕРНУТЬ</button>
    </div>
    <div class="card-face card-back" v-show="isShowing">
      <div class="card__num">01</div>
      <div class="card__text">{{ props.data.translation }}</div>
      <div class="card__actions">
        <button class="card__actions-btn" @click="actionFailed"><AppIcon name="Failed"/></button>
        <button class="card__actions-btn" @click="actionSuccess"><AppIcon name="Success"/></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  padding: 28px 19px;
  box-shadow: 0px 0px 16px 0px #0000001A;
  max-width: 250px;
  width: 100%;
  min-height: 376px;
  border-radius: 16px;
  background: var(--color-secondary);
  color:  var(--color-primary);
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
}
.card.active {
  transform: rotateY(180deg);
}
.card-face {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 19px;
  left: 19px;
  bottom: 19px;
  top: 29px;
  backface-visibility: hidden;
}
.card::before {
  content: "";
  position: absolute;
  top: 28px;
  left: 19px;
  right: 19px;
  bottom: 28px;
  border: 1px solid var(--color-bg-secondary);
  border-radius: 16px;
  pointer-events: none;
}

 .card-front {
  transform: rotateY(0deg);
}
.card-back {
  transform: rotateY(180deg);
}
.card__num {
  display: inline-block;
  transform: translate(18px, -7px);
  background: var(--color-secondary);
  z-index: 1;
  align-self: flex-start;
}

.card__text {
  text-align: center;
  font-size: 18px;
}

.card__btn {
  font-size: 12px;
  line-height: 18px;
  height: 18px;
  background: var(--color-secondary);
  padding:0 4px;
  border: none;
  align-self: center;
  cursor: pointer;
}

.card__actions {
  display: flex;
  gap: 32px;
  align-items: center;
  align-self: center;
  background: var(--color-secondary);
  padding:0 4px;
}

.card__actions-btn {
  width: 24px;
  height: 24px;
  background: none;
  border:none;
  padding:0;
  cursor: pointer;
}

.card__actions-btn svg {
  width: 100%;
  height:100%;
}
</style>