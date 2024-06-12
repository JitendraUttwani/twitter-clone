<script setup>

definePageMeta({
    // middleware: ['auth'],
    layout: 'home',
})

import axios from 'axios';


const posts = ref([]);

const token = getCookie('token');

const { data, error } = await useAsyncData('RANDOM_URL',async () => {
  try{
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get('https://twitter-clone-api-6kjm.onrender.com/api/v1/user/timeline', {
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

posts.value = data.value;

</script>

<template>
    <ProfileMainContent v-if="posts" :posts="posts"/>
</template>