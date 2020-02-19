<template>
  <div class="filter-sidebar">
    <h5>Filtres</h5>
    <button
      data-test="clean-tags-button"
      v-bind:class="{ active: activeTags.length === 0, 'tag-button': true }"
      v-on:click="handleCleanTagsClick()"
    >Tous</button>
    <button
      data-test="tag-button"
      v-bind:class="{ active: isActive(tag.name), 'tag-button': true }"
      v-for="tag of tags"
      :key="tag.name"
      v-bind:style="{ color: tag.color }"
      v-on:click="toggleActive(tag.name)"
    >{{ tag.name }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { ADD_TAG, REMOVE_TAG, CLEAN_TAGS } from '../store/actions';

export default Vue.component('TheFilterSidebar', {
  computed: {
    ...mapGetters({
      tags: 'getTags',
      activeTags: 'getActiveTags',
    }),
  },
  methods: {
    toggleActive(tagName: string) {
      if (this.activeTags.includes(tagName)) {
        this.$store.dispatch(REMOVE_TAG, tagName);
      } else {
        this.$store.dispatch(ADD_TAG, tagName);
      }
    },
    handleCleanTagsClick() {
      this.$store.dispatch(CLEAN_TAGS);
    },
    isActive(tagName: string) {
      return this.activeTags.includes(tagName);
    },
  },
});
</script>

<style scoped>
.filter-sidebar {
  position: fixed;
  height: 100%;
  width: 5rem;
  padding: 0.4rem;
  padding-bottom: 60px;
  border-right: 1px solid #30cbff33;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  z-index: 101;
  background-color: #273236;
}
.tag-button,
.tag-button:focus {
  color: #fff;
  width: 100%;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0.2rem auto;
  outline: none;
  border-radius: 0.2rem;
  font-weight: bold;
}
.tag-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tag-button.active {
  background-color: #30cbff17;
  border: 1px solid #30cbffab;
}
</style>
