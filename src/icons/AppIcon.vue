<script setup>
import { computed } from 'vue';
import * as icons from './components'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const iconName = computed(() => icons[props.name])
</script>

<template>
  <component :is='iconName'></component>
</template>