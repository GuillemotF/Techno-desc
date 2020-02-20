<template>
  <div id="app">
    <ul id="nav">
      <li>
        <router-link to="/">
          <font-awesome-icon icon="home" />
          <br />
          <span class="d-none d-md-block">Accueil</span>
        </router-link>
      </li>
      <li>
        <router-link to="/item-list?type=language">
          <font-awesome-icon icon="language" />
          <br />
          <span class="d-none d-md-block">Langages</span>
        </router-link>
      </li>
      <li>
        <router-link to="/item-list?type=framework">
          <font-awesome-icon icon="atom" />
          <br />
          <span class="d-none d-md-block">Frameworks</span>
        </router-link>
      </li>
      <li>
        <router-link to="/item-list?type=software">
          <font-awesome-icon icon="laptop-code" />
          <br />
          <span class="d-none d-md-block">Logiciels</span>
        </router-link>
      </li>
      <li>
        <router-link to="/item-list?type=test">
          <font-awesome-icon icon="vial" />
          <br />
          <span class="d-none d-md-block">Unit-test</span>
        </router-link>
      </li>
      <li v-if="!!userToken">
        <router-link to="/new">
          <font-awesome-icon icon="plus" />
          <br />
          <span class="d-none d-md-block">Nouveau</span>
        </router-link>
      </li>
      <li v-if="!userToken">
        <router-link to="/login">
          <font-awesome-icon icon="user" />
          <br />
          <span class="d-none d-md-block">Login</span>
        </router-link>
      </li>
      <li v-else>
        <button class="menu-item" v-on:click="handleLogoutClick()">
          <font-awesome-icon icon="sign-out-alt" />
          <br />
          <span class="d-none d-md-block">Logout</span>
        </button>
      </li>
    </ul>
    <div class="content">
      <transition name="app-fade">
        <div v-if="loading" class="loading">
          <font-awesome-icon icon="spinner" size="6x" spin />
        </div>
        <router-view v-else />
      </transition>
    </div>
  </div>
</template>
<script>
import { AUTH_LOGOUT, GET_TAGS } from '@/store/actions';

export default {
  name: 'app',
  computed: {
    userToken() {
      return this.$store.state.userToken;
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.$store.dispatch(GET_TAGS).then(() => {
      this.loading = false;
    });
  },
  methods: {
    handleLogoutClick() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        if (this.$router.currentRoute.path !== '/') {
          this.$router.push('/');
        }
      });
    },
  },
};
</script>
<style>
html body {
  background-color: #273236;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 35px,
    #27323625 35px,
    #13161817 70px
  );
  margin: 0;
}
.loading {
  padding-top: 2rem;
  margin: auto;
  left: 0;
  right: 0;
  position: absolute;
}
.content {
  padding-top: 65px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e5eff0;
}

#nav {
  list-style-type: none;
  margin: 0;
  padding: 0.5rem;
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #273236;
  box-shadow: 0 5px 10px 2px black;
  border-bottom: 1px solid #30cbff33;
  z-index: 100;
}

#nav a,
#nav .menu-item {
  font-weight: bold;
  color: #ccf2ff;
  display: block;
  text-decoration: none;
  background: none;
  border: none;
}

#nav a:hover,
#nav .menu-item:hover {
  color: #30cbff;
}
#nav a.router-link-exact-active {
  color: #30cbff;
}
.app-fade-enter-active,
.app-fade-leave-active {
  transition: opacity 0.2s;
}
.app-fade-enter,
.app-fade-leave-to {
  opacity: 0;
}
</style>
