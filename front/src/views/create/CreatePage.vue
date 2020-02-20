<template>
  <div class="flex-container" data-test="create-page-container">
    <div class="row">
      <ButtonLinkComponent
        imgFilename="language.png"
        to="/techno/new"
        class="col-md-10 offset-md-1"
        icon="plus"
        text="Créer un nouvel article"
      />
      <ButtonLinkComponent
        imgFilename="tag.jpg"
        to="/tag/new"
        class="col-md-10 offset-md-1"
        icon="plus"
        text="Créer un nouveau tag"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('CreateTechnoPage', {});
</script>

<style>
label.imgFile input[type='file'] {
  position: absolute;
  opacity: 0;
  z-index: -10;
  width: 1;
  height: 1;
}

.imgFile {
  max-width: 20rem;
  padding: 0.3rem 1.5rem;
  color: #e5eff0;
  background-color: #016080;
  border: 1px solid rgb(34, 67, 80);
  border-radius: 0.2rem;
}
.imgFile:hover {
  background: #3e859c;
}
.imgFile:active {
  background: #3e859c;
}
.imgFile :invalid + span {
  color: #a44;
}
.imgFile :valid + span {
  color: #e5eff0;
}
.form-container {
  padding-top: 2rem;
}
.text-input {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgb(34, 67, 80);
  border-radius: 0.2rem;
  max-width: 30rem;
  margin-bottom: 1rem;
  color: #e5eff0;
  width: 100%;
}
form.form {
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

.error {
  color: red;
}
.success {
  color: rgb(0, 189, 0);
}
</style>
