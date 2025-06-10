import { shallowMount } from '@vue/test-utils';
import HomeView from '@/components/HomeView.vue';

describe('HomeView.vue', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;

    fetchMock.mockImplementation((url) => {
      if (url.includes('api-finfo.vndirect.com.vn')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [{ code: 'STOCK1' }, { code: 'STOCK2' }] }),
        });
      } else if (url.includes('services.entrade.com.vn')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ issuer: 'Company A' }),
        });
      } else if (url.includes('/getPotentialSymbols')) {
         return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [{ symbol: 'POT1' }, { symbol: 'POT2' }], latest_updated: '2025-01-01T00:00:00Z' }),
        });
      }
      return Promise.reject(new Error(`unexpected fetch url: ${url}`));
    });
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it('renders without errors', () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.exists()).toBe(true);
  });

  it('emits "update:stocks" event with fetched stocks on mount', async () => {
    const wrapper = await shallowMount(HomeView);
    // Wait for the onMounted hook to finish and any subsequent updates
    await wrapper.vm.$nextTick();
    
    expect(wrapper.emitted('update:stocks')).toBeTruthy();
    expect(wrapper.emitted('update:stocks')[0][0]).toEqual([{ code: 'STOCK1' }, { code: 'STOCK2' }]);
  });
});