<script setup>
definePageMeta({
    middleware: ['auth'],
    layout: 'home',
})

import axios from 'axios';


const posts = ref([]);

const token = getCookie('token');

const { data: timelineData, error } = await useAsyncData(async () => {
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

// console.log(timelineData);

posts.value = timelineData.value;


</script>

<template>
    <ProfileMainContent :posts="posts"/>
</template>