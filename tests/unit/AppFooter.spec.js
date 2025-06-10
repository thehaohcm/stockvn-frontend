import { shallowMount } from '@vue/test-utils';
import AppFooter from '@/components/AppFooter.vue';

describe('AppFooter.vue', () => {
  it('renders copyright text', () => {
    const wrapper = shallowMount(AppFooter);
    expect(wrapper.text()).toContain('Copyright © by Nguyen The Hao 2025. All rights reserved.');
  });
});