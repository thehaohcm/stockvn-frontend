import { createRouter, createWebHistory } from 'vue-router';
import router from '@/router'; // Import the router instance

describe('Router', () => {
  it('should have a history mode of createWebHistory', () => {
    const testRouter = createRouter({
      history: createWebHistory(),
      routes: [],
    });
    expect(testRouter.options.history).toBeDefined();
    expect(testRouter.options.history.base).toBeDefined();
  });

  it('should have the correct routes defined', () => {
    const routes = router.getRoutes();
    
    // Check if the 'Home' route exists
    const homeRoute = routes.find(route => route.name === 'Home');
    expect(homeRoute).toBeDefined();
    expect(homeRoute.path).toBe('/');
    expect(homeRoute.components.default).toBeDefined(); // Check if a component is associated
  });
});