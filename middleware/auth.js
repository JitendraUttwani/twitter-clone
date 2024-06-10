export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const token = useCookie('token').value;
  
  if (token) {
    if (!userStore.isFetched) {
      const userId = useCookie('user').value.user_id;
      await userStore.fetchUserData(userId);
      userStore.fetchComplete();
    }
  } else {
    if (to.meta.requiresAuth) {
      return navigateTo('/login');
    }
  }

});