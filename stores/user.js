import { defineStore } from 'pinia';
import axios from 'axios';


// No api calls on userStore
// No calls in the middleware
// Followings count bug fix
// Authenticated landing page, login and register
// Footer and header implementation in MainContent via slots
// useComposables for common api/functions calls


export const useUserStore = defineStore('user', () => {
  const followed = ref([]);
  const likedPosts = ref([]);
  const isFetched = ref(false);
  const addFollowings = (userId) => {
    if (!followed.value.includes(userId)) {
      followed.value.push(userId);
    }
  };

  const setLikedPosts = (post_id) => {
    if (!likedPosts.value.includes(post_id)) {
      likedPosts.value.push(post_id);
    }
  };

  const removeFollowings = (userId) => {
    const index = followed.value.indexOf(userId);
    if (index > -1) {
      followed.value.splice(index, 1);
    }
  };

  const removeLikedPosts = (post_id) => {
    const index = likedPosts.value.indexOf(post_id);
    if (index > -1) {
      likedPosts.value.splice(index, 1);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = useCookie('token').value;
      const userId = useCookie('user').value.user_id;
      // console.log(userId);

      const followingsResponse = await axios.get(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${userId}/followings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (followingsResponse.data.success) {
        console.log(followingsResponse.data);
        const followingIds = followingsResponse.data.data.map(user => user.user_id);
        followed.value = followingIds;
      } else {
        throw new Error('Failed to fetch followings');
      }

      const likedPostsResponse = await axios.get(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${userId}/liked-posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (likedPostsResponse.data.success) {
        console.log(likedPostsResponse.data);
        const likedPostIds = likedPostsResponse.data.data.map(post => post.post_id);
        likedPosts.value = likedPostIds;
      } else {
        throw new Error('Failed to fetch liked posts');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchComplete = () => {
    isFetched.value = true;
  }
  const fetchIncomplete = () => {
    isFetched.value = false;
  }

  return {
    followed,
    likedPosts,
    setLikedPosts,
    removeLikedPosts,
    addFollowings,
    removeFollowings,
    fetchUserData,
    fetchComplete,
    fetchIncomplete,
    isFetched,
  };
});