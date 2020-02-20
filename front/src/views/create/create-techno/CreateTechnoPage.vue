<template>
  <div class="container">
    <form
      key="1"
      class="row techno-item-container"
      @submit.prevent="submit"
      :class="success && 'after-success'"
    >
      <div class="col-md-2">
        <label class="imgFile">
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
          <span>Choisir un fichier</span>
        </label>
        <span>{{ imgFileStatus }}</span>
        <img :src="imgUrl" />
      </div>
      <div class="prez-desc col-md-10">
        <div>
          <div class="d-flex align-items-center justify-content-center">
            <input class="text-input" required v-model="title" type="text" />
          </div>
          <div class="tag-list">
            <span
              v-on:click="toggleTag(tag.name)"
              class="tag edit"
              :class="tagNames.includes(tag.name) && 'active'"
              v-for="tag of allTags"
              :key="tag.name"
              v-bind:style="{
              'border-color': tagNames.includes(tag.name) ? tag.color : 'transparent',
              color: tag.color,
            }"
            >{{ tag.name }}</span>
          </div>
        </div>
        <input class="text-input" required v-model="id" type="text" />
        <SelectComponent :value="type" :options="['framework', 'language', 'test', 'software']" />
        <TextareaComponent v-model="desc" />
        <span :class="error ? 'error' : 'success'">{{ response }}</span>
        <ButtonComponent
          :loading="loading"
          type="submit"
          :disabled="!title || !id || !desc || !type"
        >
          Créer
          <font-awesome-icon icon="check" />
        </ButtonComponent>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ButtonComponent from '@/shared/button/ButtonComponent.vue';
import TextareaComponent from '@/shared/text-area/TextareaComponent.vue';
import SelectComponent from '@/shared/select/SelectComponent.vue';
import { POST_TECHNO } from '@/store/actions';

const defaultData = {
  file: null as File | null,
  imgFileStatus: 'Aucun fichier sélectionné',
  loading: false,
  title: 'Titre',
  id: 'ID',
  desc: 'desc',
  type: 'framework',
  error: false,
  tagNames: [] as string[],
  response: '',
  imgUrl: null as string | null,
  success: false,
};
export default Vue.component('CreateTechnoPage', {
  components: {
    ButtonComponent,
    TextareaComponent,
    SelectComponent,
  },
  data() {
    return defaultData;
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    allTags() {
      return this.$store.getters.getTags;
    },
  },
  methods: {
    handleFileUpload() {
      const inputFileRef = this.$refs.file as HTMLInputElement;
      if (inputFileRef.files && inputFileRef.files.length > 0) {
        this.imgFileStatus = inputFileRef.files[0].name;
        [this.file] = inputFileRef.files;
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            // cast to FileReader to fix tsc bug
            this.imgUrl = (e.target as FileReader).result as string;
          }
        };
        reader.readAsDataURL(this.file);
      } else {
        this.imgFileStatus = 'Aucun fichier sélectionné';
        this.file = null;
        this.imgUrl = null;
      }
    },
    toggleTag(tagName: string) {
      if (this.tagNames.includes(tagName)) {
        this.tagNames = this.tagNames.filter((tag: string) => tag !== tagName);
      } else {
        this.tagNames.push(tagName);
      }
    },
    submit() {
      const { title, id, desc, type, file, tagNames } = this;
      this.loading = true;
      this.$store
        .dispatch(POST_TECHNO, {
          title,
          id,
          desc,
          type,
          img: file,
          tags: tagNames,
        })
        .then((res) => {
          this.loading = false;
          this.error = false;
          this.response = 'Article créé avec succès';
          this.success = true;
          // reset to default data
          this.id = defaultData.id;
          this.title = defaultData.title;
          this.file = defaultData.file;
          this.desc = defaultData.desc;
          this.type = defaultData.type;
          this.imgUrl = defaultData.imgUrl;
          this.tagNames = defaultData.tagNames;
          this.imgFileStatus = defaultData.imgFileStatus;
          setTimeout(() => {
            this.success = false;
          }, 1000);
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.response = err.message;
        });
    },
  },
});
</script>

<style scoped>
.techno-item-container {
  display: flex;
  align-items: center;
  padding: 1rem;
}
img {
  max-width: 100%;
  max-height: 8rem;
}
h3 {
  color: #30cbff;
  margin-bottom: 0;
}
.tag-list {
  text-align: right;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.tag {
  border: 2px solid;
  padding: 0.3rem 1rem;
  border-radius: 5rem;
  margin: 0 0.2rem;
  background-color: rgba(0, 0, 0, 0.2);
  font-weight: bold;
}
.tag.edit {
  cursor: pointer;
  transition: border-color 0.3s;
}

.tag-edit.active {
  border: 2px solid;
}
.desc {
  white-space: pre-wrap;
  text-align: justify;
}
.type-select {
  margin: auto;
  cursor: pointer;
}

/* transition */
.edit-fade-enter-active {
  transition: opacity 0.3s;
}
.edit-fade-leave-active {
  transition: opacity 0.3s;
}
.edit-fade-enter,
.edit-fade-leave-to {
  opacity: 0;
}
</style>
