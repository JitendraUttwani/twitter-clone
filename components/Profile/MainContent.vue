<script setup>

import axios from 'axios';


const token = getCookie('token');

const { data: timelineData, error } = await useAsyncData('timeline', async () => {
  try{

    if (!token) {
      throw new Error('No token found');
    }
  
    const response = await axios.get('http://localhost:5000/api/v1/user/timeline', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.data.success === false) {
      throw new Error('Error fetching timeline');
    }
  
    return response.data.data;
  }catch(err){
    console.error(err);
    alert('Can\'t get timeline')
  }
}, { server: true });

console.log(timelineData);
const posts = timelineData;
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