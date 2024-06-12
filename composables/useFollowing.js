import { ref, computed } from 'vue';

export const useFollowing = () => {
    const userStore = useUserStore();
    const follow = async (user_id, event) => {
        try {
        //   event.stopPropagation();
        //   event.preventDefault();
          const token = 'Bearer ' + getCookie('token');
          const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${user_id}/follow`;
          const response = await axios.post(url, {}, {
            headers: {
              Authorization: token
            }
          });
      
          if (response.data.success) {
            userStore.addFollowings(user_id);
          } else {
            console.error('Error following user');
          }
        } catch (err) {
          console.error('Unexpected error following user:', err);
        }
      };
      
      const unfollow = async (user_id) => {
        try {
          const token = 'Bearer ' + getCookie('token');
          const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${user_id}/unfollow`;
          const response = await axios.delete(url, {
            headers: {
              Authorization: token
            }
          });
      
          if (response.data.success) {
            userStore.removeFollowings(user_id);
          } else {
            console.error('Error unfollowing user');
          }
        } catch (err) {
          console.error('Unexpected error unfollowing user:', err);
        }
      };
      

  return {
    follow,
    unfollow,
  };
};
