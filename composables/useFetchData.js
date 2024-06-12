import { ref, computed } from 'vue';
import axios from 'axios';

export const useFetchData = () => {
    const userStore = useUserStore();
    const fetchUserFollowings = async () => {
        try {
          const token = useCookie('token').value;
          const userId = useCookie('user').value.user_id;
        //   console.log(token, userId);
    
          const followingsResponse = await axios.get(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${userId}/followings`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (followingsResponse.data.success) {
            // console.log(followingsResponse.data);
            const followingIds = followingsResponse.data.data.map(user => user.user_id);
            userStore.setFollowings(followingIds);
          } else {
            throw new Error('Failed to fetch followings');
          }
        } catch (error) {
          console.log(error);
          alert('Error fetching current user\'s followings');
        }
      }
    
      const fetchUserLikedPosts = async () => {
        try {
          const token = useCookie('token').value;
          const userId = useCookie('user').value.user_id;
          const likedPostsResponse = await axios.get(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${userId}/liked-posts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (likedPostsResponse.data.success) {
            // console.log(likedPostsResponse.data);
            const likedPostIds = likedPostsResponse.data.data.map(post => post.post_id);
            userStore.setLikedPosts(likedPostIds);
          } else {
            throw new Error('Failed to fetch liked posts');
          }
        } catch (error) {
          console.log(error);
          alert('Error fetching current user\'s liked posts');
        }
      }

  return {
    fetchUserFollowings,
    fetchUserLikedPosts,
  };
};
