<script setup>

const props = defineProps({
    userId: {
        type: Number,
        required: true
    }
})

import axios from 'axios';

const likedPosts = ref([]);

const fetchLikedPosts = async () => {
    try {
        const response = await axios.get(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${props.userId}/liked-posts`, {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`
          }
        })
    
        if (response.data.success) {
            console.log(response.data.data);
            likedPosts.value = response.data.data;
        } else {
          console.error('Error fetching user profile');
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {
    await fetchLikedPosts();
})

</script>

<template>
    <div v-if="likedPosts && likedPosts.length" v-for="post in likedPosts" :key="post.post_id">
        <Post :post="post" />
    </div>
    <div v-else class="flex flex-col justify-center items-center">
        <h1 class="text-gray-600">No Liked Posts</h1>
    </div>
</template>
