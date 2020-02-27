<template>
  <div class="container">
    <form data-test="form" class="col form" @submit.prevent="submit">
      <h1>Nouveau tag</h1>
      <label>Nom</label>
      <input class="text-input" required v-model="name" type="text" />
      <label>Couleur</label>
      <verte
        v-model="color"
        picker="wheel"
        model="hex"
        menuPosition="center"
        :showHistory="false"
        :enableAlpha="false"
      />
      <span :class="$data.error ? 'error' : 'success'">{{ $data.response }}</span>
      <button v-if="loading" class="submit" disabled type="submit">
        <font-awesome-icon icon="spinner" spin />
      </button>
      <button :disabled="!name || !color" v-else class="submit" type="submit">Créer le tag</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Verte from 'verte';
import 'verte/dist/verte.css';
import { POST_TAG } from '@/store/actions';
import handleError from '../../../utils/handleError';

export default Vue.component('CreateTagPage', {
  components: { Verte },
  data() {
    return {
      name: '',
      color: '#F44336',
      loading: false,
    };
  },

  methods: {
    submit() {
      const { name, color } = this;
      this.$data.loading = true;
      this.$store
        .dispatch(POST_TAG, { name, color })
        .then(() => {
          this.$data.loading = false;
          this.$data.error = false;
          this.$data.response = 'Création réussie !';
        })
        .catch((err) => {
          this.$data.loading = false;
          this.$data.error = true;
          this.$data.response = handleError(err);
        });
    },
  },
});
</script>

<style scoped></style>
