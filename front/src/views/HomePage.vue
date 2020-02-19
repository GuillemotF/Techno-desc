<template>
  <div class="home flex-container" data-test="home-page-container">
    <div class="row">
      <ButtonLinkComponent
        key="language"
        imgFilename="language.png"
        to="/item-list?type=language"
        class="col-md-10 offset-md-1"
        icon="language"
        text="En savoir plus sur les différents langages de programmation"
      />
      <hr />
      <ButtonLinkComponent
        key="framework"
        imgFilename="framework.jpg"
        to="/item-list?type=framework"
        class="col-md-10 offset-md-1"
        icon="atom"
        text="En savoir plus sur les différents Frameworks"
      />

      <hr />
      <ButtonLinkComponent
        key="software"
        imgFilename="software.jpg"
        to="/item-list?type=software"
        class="col-md-10 offset-md-1"
        icon="laptop-code"
        text="En savoir plus sur les différents Logiciels"
      />
      <hr />
      <ButtonLinkComponent
        key="test"
        imgFilename="test.jpg"
        to="/item-list?type=test"
        class="col-md-10 offset-md-1"
        icon="vial"
        text="En savoir plus sur les outils de test unitaires"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ButtonLinkComponent from '../components/styled/ButtonLinkComponent.vue';

export default Vue.component('HomePage', {
  components: {
    ButtonLinkComponent,
  },
});
</script>

<style scoped>
.row hr {
  width: 80%;
  border-top: 1px solid #30cbff33;
}
.language {
  background-image: url('../assets/static/language.png');
  background-position: center;
  background-size: cover;
}
.framework {
  background-image: url('../assets/static/framework.jpg');
  background-position: center;
  background-size: cover;
}
.software {
  background-image: url('../assets/static/software.jpg');
  background-position: center;
  background-size: cover;
}
.test {
  background-image: url('../assets/static/test.jpg');
  background-position: center;
  background-size: cover;
}
.learn-more-item-content {
  padding: 1.5rem;
  background-color: #1c2e33c7;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: background-color 1s;
}
.learn-more-item-content:hover {
  background-color: #004b64c7;
}
a.learn-more-item {
  display: block;
  text-decoration: none;
  color: #ccf2ff;
  transition: color 1s;
  padding: 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
}

a.learn-more-item:hover {
  color: #30cbff;
  text-decoration: none;
}
</style>
