import { shallowMount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';

describe('NavBar.vue', () => {
  it('renders without errors', () => {
    const wrapper = shallowMount(NavBar);
    expect(wrapper.exists()).toBe(true);
  });

  it('toggles isMenuOpen when toggleMenu is called', async () => {
    const wrapper = shallowMount(NavBar);
    const vm = wrapper.vm;

    expect(vm.isMenuOpen).toBe(false);
    await vm.toggleMenu();
    expect(vm.isMenuOpen).toBe(true);
    await vm.toggleMenu();
    expect(vm.isMenuOpen).toBe(false);
  });
});