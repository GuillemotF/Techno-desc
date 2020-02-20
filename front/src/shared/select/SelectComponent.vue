<template>
  <v-select
    class="type-select"
    :searchable="false"
    :clearable="false"
    :options="options"
    v-on:input="$emit('input', $event)"
    :value="value"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('SelectComponent', {
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style>
.type-select .vs__search::placeholder,
.type-select .vs__dropdown-toggle,
.type-select .vs__dropdown-menu,
.type-select .vs__selected {
  background-color: #415258;
  border: none;
  color: #e2e2e2;
  text-transform: lowercase;
  font-variant: small-caps;
}

.type-select .vs__dropdown-option {
  color: #e2e2e2;
}
.type-select .vs__dropdown-option--highlight {
  background-color: #25515f;
}
.type-select .vs__clear,
.type-select .vs__open-indicator {
  fill: #e2e2e2;
}
.type-select {
  color: #e2e2e2;
  width: 100%;
  max-width: 30rem;
}
</style>
