<template>
  <div>
    <div key="list">
      <div v-if="error">
        <div class="error">{{ error }}</div>
      </div>
      <div v-else>
        <TheFilterSidebar class="d-none d-lg-block" />
        <div class="items-container container">
          <transition name="list-fade" mode="out-in">
            <div key="loading" v-if="loading" class="loading">
              <font-awesome-icon icon="spinner" size="6x" spin />
            </div>
            <div key="loading" v-else-if="technos.length === 0">
              <font-awesome-icon icon="sad-tear" size="2x" />
              <p>Aucun résultat disponible</p>
            </div>
            <div v-else>
              <div v-for="techno of technos" :key="techno.id">
                <TechnoComponent :techno="techno" />
                <hr />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import TechnoComponent from './shared/TechnoComponent.vue';
import TheFilterSidebar from './shared/TheFilterSidebar.vue';
import { getTechnos } from '@/services';
import { GET_TECHNOS } from '@/store/actions';

export default Vue.component('TechnoListPage', {
  components: {
    TheFilterSidebar,
    TechnoComponent,
  },
  data() {
    return {
      loading: true,
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      technos: 'getTechnos',
      activeTags: 'getActiveTags',
    }),
  },
  created() {
    this.fetchGetTechnos([]);
    this.$store.watch(
      (state, getters) => getters.getActiveTags,
      (newValue, oldValue) => {
        this.fetchGetTechnos(newValue);
      },
    );
  },
  watch: {
    $route() {
      this.fetchGetTechnos(this.activeTags);
    },
  },
  methods: {
    async fetchGetTechnos(activeTags) {
      this.$data.technos = [];
      this.$data.loading = true;
      this.$store
        .dispatch(GET_TECHNOS, {
          type: this.$route.query.type,
          tags: activeTags,
        })
        .then(() => {
          this.$data.error = null;
          this.$data.loading = false;
        })
        .catch((err) => {
          this.$data.error = err.message;
          this.$data.loading = false;
        });
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

.error {
  padding-top: 2rem;
}

/* transition */
.list-fade-enter-active {
  transition: opacity 0.3s;
}
.list-fade-leave-active {
  transition: opacity 0.3s;
}
.list-fade-enter,
.list-fade-leave-to {
  opacity: 0;
}
</style>
