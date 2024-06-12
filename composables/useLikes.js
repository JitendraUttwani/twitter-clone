import { ref, computed } from 'vue';

export const useLikes = () => {
    const userStore = useUserStore();
    
    const likePost = async (post_id) => {
        try {
            const token = 'Bearer ' + getCookie('token');
            const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/post/${post_id}/like`;
            const {data,error} = await useFetch(url, {
                method: 'POST',
                headers: {
                    Authorization: token
                },
            });
            if (data.value.success === false) {
                console.error('Error following user:');
            }else{
                userStore.setLikedPosts(post_id);
            }
            
            
        } catch (err) {
            console.error('Unexpected error following user:', err);
        }
    }
    
    const unlikePost = async (post_id) => {
        try {
            const token = 'Bearer ' + getCookie('token');
            const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/post/${post_id}/unlike`;
            const {data,error} = await useFetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: token
                },
            });
            // console.log(data);
            if (data.value.success === false) {
                console.error('Error following user:');
            }else{
                userStore.removeLikedPosts(post_id);
            }
            
            
        } catch (err) {
            console.error('Unexpected error following user:', err);
        }
    }
      

  return {
    likePost,
    unlikePost,
  };
};
