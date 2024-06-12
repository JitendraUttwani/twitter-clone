export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated =  !!getCookie('token');
  // console.log('to: ',to);
  // console.log('from: ',from);

  if(!isAuthenticated) {
    if(to.path !== '/i/flow/login')
      return navigateTo('/i/flow/login');
  }
  if(isAuthenticated && (to.path === '/i/flow/login' || to.path === '/i/flow/register')) {
    return navigateTo('/home');
  }
});