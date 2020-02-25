import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import TechnoComponent from './TechnoComponent.vue';

const technoProp = {
  id: 'nextjs',
  type: 'framework',
  tags: ['TS', 'JS', 'NodeJS'],
  title: 'NextJS',
  desc:
    "NextJS est un framework open-source back-end utilisant NodeJS et React.​\nIl permet d'utiliser React en SSR (Server-Side Rendering), c'est à dire de générer les pages html côté serveur plutôt que sur le client, ce qui a pour effet d'accélérer le rendu de la première page chargée par le client et d'optimiser le SEO",
};
const factory = ({ data = {}, props = {}, computed = {} }) => {
  return shallowMount(TechnoComponent, {
    propsData: {
      techno: technoProp,
      ...props,
    },
    data() {
      return {
        ...data,
      };
    },
    computed: {
      ...computed,
    },
  });
};

describe('TechnoComponent.vue', () => {
  it('renders view mode', () => {
    const wrapper = factory({});
    expect(wrapper.findAll('[data-test="techno-container"]').exists()).toBeTruthy();
  });
  it('renders tags', () => {
    const wrapper = factory({});
    expect(wrapper.findAll('[data-test="techno-tag"]').length).toBe(technoProp.tags.length);
  });
  it('renders title', () => {
    const wrapper = factory({});
    expect(wrapper.find('[data-test="techno-title"]').text()).toMatch(technoProp.title);
  });
  it('renders desc', () => {
    const wrapper = factory({});
    expect(wrapper.find('[data-test="techno-desc"]').text()).toMatch(technoProp.desc);
  });
  it('renders form if in edit mode', () => {
    const wrapper = factory({ data: { editMode: true } });
    expect(wrapper.find('[data-test="techno-edit-form"]').exists()).toBeTruthy();
  });
  it('renders view mode on back button click', async () => {
    const wrapper = factory({ data: { editMode: true } });
    wrapper.find('[data-test="techno-edit-toggle-button"]').trigger('click');
    await Vue.nextTick();
    expect(wrapper.find('[data-test="techno-edit-form"]').exists()).toBeTruthy();
  });
});
