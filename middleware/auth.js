
export default defineNuxtRouteMiddleware((to, from) => {
    if(process.client){
        const isAuthenticated = !!getCookie('token');
        if (!isAuthenticated && !['login', 'register'].includes(to.name)) {
          return navigateTo('i/flow/login');
        }
        if (isAuthenticated && ['login', 'register'].includes(to.name)) {
          return navigateTo('/');
        }
    }
  });
  