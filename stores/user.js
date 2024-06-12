import { defineStore } from 'pinia';
import axios from 'axios';


// No api calls on userStore
// No calls in the middleware
// Followings count bug fix
// Authenticated landing page, login and register
// Footer and header implementation in MainContent via slots


export const useUserStore = defineStore('user', () => {
  const followed = ref([]);
  const currentUserFollowers = ref(0);
  const currentUser = ref(null);
  const likedPosts = ref([]);
  const followerCount = ref(0);
  const followingCount = ref(0);
  const likedPostsFetched = ref(false);
  const followedFetched = ref(false);

  


  const addFollowings = (userId) => {
    if (!followed.value.includes(userId)) {
      followed.value.push(userId);
      followedFetched.value = false;
    }
  };

  const addLikedPosts = (post_id) => {
    if (!likedPosts.value.includes(post_id)) {
      likedPosts.value.push(post_id);
      likedPostsFetched.value = false;
    }
  };

  const removeFollowings = (userId) => {
    const index = followed.value.indexOf(userId);
    if (index > -1) {
      followed.value.splice(index, 1);
      followedFetched.value = false;
    }
  };

  const removeLikedPosts = (post_id) => {
    const index = likedPosts.value.indexOf(post_id);
    if (index > -1) {
      likedPosts.value.splice(index, 1);
      likedPostsFetched.value = false;
    }
  };

  const setLikedPosts = (data) => {
    console.log(typeof data);
    console.log(data);
    likedPosts.value = data;
    likedPostsFetched.value = true;
  }

  const setFollowings = (data) => {
    followed.value = data;
    followedFetched.value = true;
  }

  const setFollowingCount = (data) => {
    followingCount.value = data;
  }
  const setFollowerCount = (data) => {
    followerCount.value = data;
  }

  const setCurrentUserFollowers = (data) => {
    currentUserFollowers.value = data;
  }

  const setCurrentUser = (data) => {
    currentUser.value = data;
  }


  return {
    followed,
    likedPosts,
    likedPostsFetched,
    followedFetched,
    addLikedPosts,
    addFollowings,
    removeFollowings,
    removeLikedPosts,
    setLikedPosts,
    setFollowings,
    followerCount,
    followingCount,
    setFollowingCount,
    setFollowerCount,
    currentUserFollowers,
    setCurrentUserFollowers,
    currentUser,
    setCurrentUser,
  };
});