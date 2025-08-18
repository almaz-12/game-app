<script setup>
import AppIcon from '../icons/AppIcon.vue'
const props = defineProps({
  score: {
    type: Number,
    default: 0,
  }
})
</script>

<template>
  <div class="score">
    {{ score }}
    <AppIcon name="Heart"/>
  </div>
</template>

<style scoped>
.score {
  display: flex;
  gap: 10px ;
  align-items: center;
  justify-content: center;
  border-radius: 36px;
  padding-top: 12px;
  padding-right: 24px;
  padding-bottom: 12px;
  padding-left: 24px;
  background: #CCE8FF;
  box-shadow: 0px 0px 4px 0px #00000026;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #008BFE;

}
</style>