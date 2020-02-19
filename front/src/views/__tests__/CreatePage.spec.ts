import { shallowMount } from '@vue/test-utils';
import CreatePage from '@/views/CreatePage.vue';

describe('CreatePage.vue', () => {
  const wrapper = shallowMount(CreatePage);
  it('renders correctly', () => {
    expect(wrapper.find('[data-test="create-page-container"]')).toBeTruthy();
  });
});
