<template>
  <button v-if="loading" class="techno-button" disabled :type="type">
    <font-awesome-icon icon="spinner" spin />
  </button>
  <button :disabled="disabled" v-else class="techno-button" :type="type" v-on:click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('ButtonComponent', {
  props: {
    type: String,
    loading: Boolean,
    disabled: Boolean,
    onClick: {
      type: Function,
      default: () => {},
    },
  },
});
</script>

<style scoped>
.techno-button {
  max-width: 10rem;
  padding: 0.3rem 1.5rem;
  color: #e5eff0;
  background-color: #016080;
  border: 1px solid rgb(34, 67, 80);
  border-radius: 0.2rem;
}
.techno-button:disabled {
  background-color: #5c5c5c;
}
</style>
