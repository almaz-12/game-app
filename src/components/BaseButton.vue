<script setup></script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  max-width: 335px;
  width: 100%;
  border-radius: 100px;
  padding-top: 16px;
  padding-right: 10px;
  padding-bottom: 16px;
  padding-left: 10px;
  background: var(--color-bg-button);
  border: none;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: #FFFFFF;
  cursor: pointer;
}

.btn:hover {
  background: var(--color-bg-button-hover);
}
</style>