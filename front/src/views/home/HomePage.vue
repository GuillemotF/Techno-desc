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
        text="En savoir plus sur les différents frameworks"
      />

      <hr />
      <ButtonLinkComponent
        key="software"
        imgFilename="software.jpg"
        to="/item-list?type=software"
        class="col-md-10 offset-md-1"
        icon="laptop-code"
        text="En savoir plus sur les différents logiciels"
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
import ButtonLinkComponent from '@/shared/button-link/ButtonLinkComponent.vue';

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
</style>
