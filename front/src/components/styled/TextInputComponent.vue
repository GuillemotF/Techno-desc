<template>
  <textarea
    class="techno-text-area"
    :required="required"
    v-on:input="$emit('input', $event.target.value)"
    :value="value"
    type="text"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('TextInputComponent', {
  props: {
    value: String,
    required: Boolean,
  },
});
</script>

<style scoped>
.techno-text-area {
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgb(34, 67, 80, 0.5);
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  min-height: 8rem;
  color: #e5eff0;
  width: 100%;
  transition: border-color 0.5s;
  padding: 0.5rem;
}
.techno-text-area:focus {
  border-color: rgb(33, 118, 151);
}
</style>
