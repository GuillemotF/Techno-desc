<template>
  <div>
    <label class="imgFile">
      <input type="file" id="file" ref="file" v-on:change="handleChange()" />
      <span>Choisir une image</span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('FileInputComponent', {
  props: {
    techno: Object,
    onChange: Function,
  },
  methods: {
    handleChange() {
      const inputFileRef = this.$refs.file as HTMLInputElement;
      if (inputFileRef.files && inputFileRef.files.length > 0) {
        const imgName = inputFileRef.files[0].name;
        const file = inputFileRef.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            // cast to FileReader to fix tsc bug
            const imgUrl = (e.target as FileReader).result as string;
            this.onChange({ imgUrl, imgName, file });
          }
        };
        reader.readAsDataURL(inputFileRef.files[0]);
      } else {
        this.onChange({ imgUrl: null, imgName: null, file: null });
      }
    },
  },
});
</script>
<style scoped>
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
</style>