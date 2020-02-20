<template>
  <div>
    <transition name="list-loading-fade" mode="out-in">
      <div key="loading" v-if="loading" class="loading">
        <font-awesome-icon icon="spinner" size="6x" spin />
      </div>
      <div key="list" v-else>
        <div v-if="error">
          <div class="error">{{ error }}</div>
        </div>
        <div v-else>
          <TheFilterSidebar class="d-none d-lg-block" />
          <div class="items-container container">
            <div v-for="techno of technos" :key="techno.id">
              <TechnoComponent :techno="techno" />
              <hr />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import TechnoComponent from './shared/TechnoComponent.vue';
import TheFilterSidebar from './shared/TheFilterSidebar.vue';
import { getTechnos } from '@/services';

export default Vue.component('TechnoListPage', {
  components: {
    TheFilterSidebar,
    TechnoComponent,
  },
  data() {
    return {
      loading: true,
      technos: [],
      error: null,
    };
  },
  created() {
    this.fetchGetTechnos();
  },
  watch: {
    $route: 'fetchGetTechnos',
  },
  methods: {
    async fetchGetTechnos() {
      this.$data.technos = [];
      this.$data.loading = true;
      try {
        this.$data.technos = await getTechnos(this.$route.query.type);
        this.$data.error = null;
        this.$data.loading = false;
      } catch (err) {
        this.$data.error = err.message;
        this.$data.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.loading {
  padding-top: 2rem;
  margin: auto;
  left: 0;
  right: 0;
  position: absolute;
}
div.items-container {
  padding-left: 3rem;
  padding-right: 0.2rem;
  padding-top: 1rem;
}
@media (max-width: 991.98px) {
  div.items-container {
    padding-left: 0.2rem;
  }
}
.items-container hr {
  width: 80%;
  border-top: 1px solid #30cbff33;
}
.list-loading-fade-enter-active,
.list-loading-fade-leave-active {
  transition: opacity 0.2s;
}
.list-loading-fade-enter,
.list-loading-fade-leave-to {
  opacity: 0;
}

.error {
  padding-top: 2rem;
}
</style>
