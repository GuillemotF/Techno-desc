import { shallowMount } from '@vue/test-utils';
import HomePage from '@/views/CreateTechnoPage.vue';

describe('HomePage.vue', () => {
  const wrapper = shallowMount(HomePage);
  it('renders correctly', () => {
    expect(wrapper.find('[data-test="home-page-container"]')).toBeTruthy();
  });
});
