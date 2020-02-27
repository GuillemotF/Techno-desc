<template>
  <transition name="edit-fade" mode="out-in">
    <form
      data-test="techno-edit-form"
      :key="technoData.id + '1'"
      v-if="editMode"
      class="row techno-item-container"
      @submit.prevent="submit"
    >
      <div class="col-md-2">
        <FileInputComponent :onChange="handleFileChange" />
        <span>{{ imgFileStatus }}</span>
        <img :src="imgUrl" />
      </div>
      <div class="prez-desc col-md-10">
        <div>
          <div class="d-flex align-items-center justify-content-center">
            <input class="text-input" required v-model="title" type="text" />
            <ButtonComponent
              v-if="isAdmin"
              :onClick="toggleEditMode"
              class="ml-2"
              type="button"
              data-test="techno-edit-toggle-button"
            >
              <font-awesome-icon icon="undo" />
            </ButtonComponent>
            <ButtonComponent
              :loading="loading"
              type="submit"
              :disabled="!title || !id || !desc || !type"
            >
              <font-awesome-icon icon="check" />
            </ButtonComponent>
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
              >{{ tag.name }}</span
            >
          </div>
        </div>
        <SelectComponent v-model="type" :options="['framework', 'language', 'test', 'software']" />

        <TextareaComponent v-model="desc" />
        <span :class="error ? 'error' : 'success'">{{ response }}</span>
      </div>
    </form>
    <article
      :key="technoData.id + '2'"
      v-else
      class="row techno-item-container"
      :class="success && 'after-success'"
    >
      <div class="col-md-2">
        <img :src="technoData.imgUrl" />
      </div>
      <div class="prez-desc col-md-10">
        <div>
          <div class="d-flex align-items-center justify-content-center">
            <h3 data-test="techno-title">{{ technoData.title }}</h3>
            <ButtonComponent v-if="isAdmin" :onClick="toggleEditMode" class="ml-2">
              <font-awesome-icon icon="edit" />
            </ButtonComponent>
          </div>
          <div class="tag-list">
            <span
              data-test="techno-tag"
              class="tag"
              v-for="tag of tags"
              :key="tag.name"
              v-bind:style="{
                'border-color': tag.color,
                color: tag.color,
              }"
              >{{ tag.name }}</span
            >
          </div>
        </div>
        <p class="desc" data-test="desc">{{ technoData.desc }}</p>
      </div>
    </article>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import ButtonComponent from '@/shared/button/ButtonComponent.vue';
import TextareaComponent from '@/shared/text-area/TextareaComponent.vue';
import SelectComponent from '@/shared/select/SelectComponent.vue';
import FileInputComponent from '@/shared/file-input/FileInputComponent.vue';
import { PATCH_TECHNO } from '@/store/actions';

export default Vue.component('TechnoComponent', {
  props: {
    techno: Object,
  },
  components: {
    ButtonComponent,
    TextareaComponent,
    SelectComponent,
    FileInputComponent,
  },
  data() {
    return {
      technoData: this.techno,
      tags: this.techno.tags
        ? this.techno.tags.map((tag: string) => this.$store.state.tags[tag])
        : [],
      editMode: false,
      file: null as File | null,
      imgFileStatus: this.techno.imgUrl ? '' : 'Aucun fichier sélectionné',
      loading: false,
      title: this.techno.title || 'Titre',
      id: this.techno.id || 'ID',
      desc: this.techno.desc || 'desc',
      type: this.techno.type || 'framework',
      error: false,
      tagNames: this.techno.tags || [],
      response: '',
      imgUrl: this.techno.imgUrl,
      success: false,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    allTags() {
      return this.$store.getters.getTags;
    },
    orderedTags(): App.Tag[] {
      const orderedTags = [...this.tags];
      return orderedTags.sort((a: App.Tag, b: App.Tag) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    },
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
      this.success = false;
    },
    handleFileChange({ imgUrl, imgName, file }: { imgUrl: string; imgName: string; file: File }) {
      this.file = file;
      this.imgUrl = imgUrl || this.techno.imgUrl;
      this.imgFileStatus = imgName || '';
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
        .dispatch(PATCH_TECHNO, {
          id,
          title,
          desc,
          type,
          img: file,
          tags: tagNames,
        })
        .then((res) => {
          this.technoData = res;
          this.tags = res.tags.map((tag: string) => this.$store.state.tags[tag]);
          this.editMode = false;
          this.loading = false;
          this.error = false;
          this.response = '';
          this.success = true;
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
  background-color: #273236;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.5s;
}
.techno-item-container.after-success {
  box-shadow: 0 0 2px 2px rgba(0, 255, 115);
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
