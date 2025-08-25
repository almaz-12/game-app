<script setup>
import { ref, onUnmounted, computed } from 'vue';

import AppIcon from '../icons/AppIcon.vue';

const props = defineProps({
  data: {
    type: Object,
    require: true,
  }
})

const emits = defineEmits({
  'open-card': (payload) => {
    return typeof payload === "number"
  },
  'success-action': (payload) => {
    return typeof payload === "number"
  },
  'failed-action': (payload) => {
    return typeof payload === "number"
  }
});

const isShowing = computed(() => props.data.state === 'closed' ? false : true);
const isSuccess = computed(() => props.data.status === 'success' ? true : false);
const isFailed = computed(() => props.data.status === 'failed' ? true : false);
const isFinish = computed(() => props.data.status === 'pending' ? true : false);
const isAnimating = ref(false);

let animationTimer = null;

const numCard = computed(() => {
  return props.data.id + 1;
});

function handleTurn(data) {
  if (isAnimating.value) return; // ← блокируем повторные клики
  isAnimating.value = true;
  emits('open-card', data);

  if (animationTimer) clearTimeout(animationTimer);

  animationTimer = setTimeout(() => {
    isAnimating.value = false;
  }, 800);
}

function actionSuccess(data) {
  emits('success-action', data);
}
function actionFailed(data) {
  emits('failed-action', data);
}

onUnmounted(() => {
  if (animationTimer) clearTimeout(animationTimer);
});
</script>

<template>
  <div :class="['card', { 'active' : isShowing }]">
    <div class="card-face card-front" v-show="!isShowing">
      <div class="card__num">{{ numCard }}</div>
      <div class="card__text"> {{ props.data.word }}</div>
      <button class="card__btn" @click="handleTurn(props.data.id)">ПЕРЕВЕРНУТЬ</button>
    </div>
    <div class="card-face card-back" v-show="isShowing">
      <div class="card__num">
        {{ numCard }}
      </div>
      <AppIcon name="Success" class="card__icon" v-if="isSuccess"/>
      <AppIcon name="Failed" class="card__icon" v-else-if="isFailed"/>
      <div class="card__text">{{ props.data.translation }}</div>
      <div class="card__actions" v-if="isFinish">
        <button class="card__actions-btn" @click="actionFailed(props.data.id)"><AppIcon name="Failed"/></button>
        <button class="card__actions-btn" @click="actionSuccess(props.data.id)"><AppIcon name="Success"/></button>
      </div>
      <div v-else class="card__btn">ЗАВЕРШЕНО</div>
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

.card__icon {
      position: absolute;
    left: 40%;
    top: -17px;
}
</style>