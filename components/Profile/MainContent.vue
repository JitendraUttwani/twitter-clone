<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Post from '~/components/Post.vue';
import PostTweet from '~/components/PostTweet.vue';

const posts = ref([]);
const fetchTimeline = async () => {
    try {
    const response = await axios.get('http://localhost:5000/api/v1/user/timeline', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    // console.log(response.data);
    if (response.success === false) {
      console.error('Error fetching timeline:', fetchError.value);
      error.value = fetchError.value;
    } else {
      posts.value = response.data.data;
    }
  } catch (err) {
    console.error('Unexpected error fetching timeline:', err);
    error.value = err;
  }
};

onMounted(() => {
    fetchTimeline();
});
// console.log(posts.value);
</script>



<template>
    <div class="col-start-2 col-end-4 border border-gray-600 flex flex-col h-full">
        <div class="flex border border-gray-600">
            <div class="border p-3 w-1/2 border-gray-600 text-center">
                For you
            </div>
            <div class="border w-1/2 p-3 border-gray-600 text-center">
                Following
            </div>
        </div>
        <div class="flex border w-full border-gray-600">
            <PostTweet />
        </div>
        <div class="border text-blue-500 p-3 border-gray-600 text-center">
            Show All posts
        </div>
        <div v-for="post in posts" :key="post.post_id">
            <!-- {{ console.log(post) }} -->
            <Post :post="post" />
        </div>
        

    </div>
</template>