<template>
  <router-link
    class="button-link"
    :style="{'background-image': 'url(' + require('@/assets/static/' + imgFilename) + ')'}"
    :to="to"
  >
    <div class="button-link-content">
      <font-awesome-icon :icon="icon" size="5x" />
      <p>{{text}}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('ButtonLinkComponent', {
  props: {
    to: String,
    icon: String,
    text: String,
    imgFilename: String,
  },
});
</script>

<style scoped>
.button-link-content {
  padding: 1.5rem;
  background-color: #1c2e33c7;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: background-color 1s;
}
.button-link-content:hover {
  background-color: #004b64c7;
}
a.button-link {
  display: block;
  text-decoration: none;
  color: #ccf2ff;
  transition: color 0.5s, transform 0.5s;
  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
  background-position: center;
  background-size: cover;
}

a.button-link:hover {
  color: #ffffff;
  text-decoration: none;
  transform: scale(1.05);
}
</style>

      
