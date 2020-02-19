import Vuex, { Store } from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilterSidebar from '@/components/TheFilterSidebar.vue';
import { CLEAN_TAGS, ADD_TAG, REMOVE_TAG } from '@/store/actions';

const mockedTags = {
  JS: { name: 'JS', color: '#F7DF1E' },
  TS: { name: 'TS', color: '#007ACB' },
};
const localVue = createLocalVue();
localVue.use(Vuex);

describe('FilterSidebar.vue', () => {
  describe('No active tags', () => {
    let getters;
    let store: Store<any>;
    beforeEach(() => {
      getters = {
        getTags: () => mockedTags,
        getActiveTags: () => [],
      };

      store = new Vuex.Store({
        getters,
      });
    });

    it('renders full FilterSidebar', () => {
      const wrapper = shallowMount(FilterSidebar, { store, localVue });
      expect(wrapper.find('.filter-sidebar').text()).toBeTruthy();
    });
    it('dispatch "CLEAN_TAGS" on button click', () => {
      const wrapper = shallowMount(FilterSidebar, { store, localVue });
      const dispatch = jest.spyOn(wrapper.vm.$store, 'dispatch').mockImplementation(jest.fn());
      wrapper.find('[data-test="clean-tags-button"]').trigger('click');
      expect(dispatch).toBeCalledWith(CLEAN_TAGS);
    });
    it('dispatch "ADD_TAG" on button click', () => {
      const wrapper = shallowMount(FilterSidebar, { store, localVue });
      const dispatch = jest.spyOn(wrapper.vm.$store, 'dispatch').mockImplementation(jest.fn());
      const buttonWrapper = wrapper.find('[data-test="tag-button"]');
      buttonWrapper.trigger('click');
      expect(dispatch).toBeCalledWith(ADD_TAG, buttonWrapper.text());
    });
  });
  describe('Active tags', () => {
    let getters;
    let store: Store<any>;
    beforeEach(() => {
      getters = {
        getTags: () => mockedTags,
        getActiveTags: () => ['JS'],
      };

      store = new Vuex.Store({
        getters,
      });
    });
    it('dispatch "REMOVE_TAG" on active button click', () => {
      const wrapper = shallowMount(FilterSidebar, { store, localVue });
      const dispatch = jest.spyOn(wrapper.vm.$store, 'dispatch').mockImplementation(jest.fn());
      const buttonWrapper = wrapper.find('.active');
      buttonWrapper.trigger('click');
      expect(dispatch).toBeCalledWith(REMOVE_TAG, buttonWrapper.text());
    });
  });
});
