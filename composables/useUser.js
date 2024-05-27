import { ref, computed } from 'vue';

export const useUser = () => {
  const isAuthenticated = ref(false);
  const user = ref(null);
  const token = ref(null);
  
  if (process.client) {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
      isAuthenticated.value = true;
    }
  }

  const setUser = (userData) => {
    user.value = userData;
    isAuthenticated.value = true;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const setToken = (userToken) => {
    token.value = userToken;
    localStorage.setItem('token', userToken);
  };

  const clearUser = () => {
    user.value = null;
    isAuthenticated.value = false;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    token: computed(() => token.value),
    setUser,
    setToken,
    clearUser,
  };
};
