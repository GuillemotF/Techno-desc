<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Connexion</h1>
      <label>
        Email
        <input class="text-input" required v-model="email" type="text" data-test="email-input" />
      </label>
      <label>
        Password
        <input
          class="text-input"
          required
          v-model="password"
          type="password"
          data-test="password-input"
        />
      </label>
      <hr />
      <span class="error" :v-if="error.length === 0">{{ error }}</span>
      <button v-if="loading" class="submit" disabled type="submit">
        <font-awesome-icon icon="spinner" spin />
      </button>
      <button v-else class="submit" type="submit" data-test="submit-button">Login</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import { login } from '@/services';
import { AUTH_REQUEST } from '@/store/actions';

export default Vue.component('LoginPage', {
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      const { email, password } = this;
      this.$data.loading = true;
      this.$store
        .dispatch(AUTH_REQUEST, { email, password })
        .then(() => {
          this.$data.loading = false;
          this.$router.push('/');
        })
        .catch((err) => {
          this.$data.loading = false;
          this.$data.error = err.message;
        });
    },
  },
});
</script>
<style scoped>
.text-input {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgb(34, 67, 80);
  border-radius: 0.2rem;
  max-width: 20rem;
  margin-bottom: 1rem;
  color: #e5eff0;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button.submit {
  max-width: 10rem;
  padding: 0.3rem 1.5rem;
  color: #e5eff0;
  background-color: #016080;
  border: 1px solid rgb(34, 67, 80);
  border-radius: 0.2rem;
}
button.submit:disabled {
  background-color: #5c5c5c;
}
</style>
