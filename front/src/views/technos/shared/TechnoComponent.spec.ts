import { shallowMount } from '@vue/test-utils';
import TechnoComponent from './TechnoComponent.vue';

describe('TechnoComponent.vue', () => {
  const technoProp = {
    id: 'nextjs',
    type: 'framework',
    tags: ['TS', 'JS', 'NodeJS'],
    title: 'NextJS',
    desc:
      "NextJS est un framework open-source back-end utilisant NodeJS et React.​\nIl permet d'utiliser React en SSR (Server-Side Rendering), c'est à dire de générer les pages html côté serveur plutôt que sur le client, ce qui a pour effet d'accélérer le rendu de la première page chargée par le client et d'optimiser le SEO",
  };
  const wrapper = shallowMount(TechnoComponent, {
    propsData: {
      techno: technoProp,
    },
  });
  it('renders correctly', () => {
    expect(wrapper.find('.desc').text()).toMatch(technoProp.desc);
    expect(wrapper.findAll('.tag').length).toBe(3);
    expect(wrapper.find('h3').text()).toMatch(technoProp.title);
  });
});
