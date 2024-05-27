<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';


const users = ref([]);
const followed = ref([]);
const fetchSuggestions = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/user/suggestions', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        });
        if (response.success === false) {
            console.error('Error fetching timeline:');
        } else {
            // console.log(response.data.data);
            users.value = response.data.data;
            console.log(users.value);
        }
    } catch (err) {
        console.error('Unexpected error fetching timeline:', err);
    }
  
};


const follow = async (user_id,event) => {
    try {
        console.log(user_id);
        console.log(localStorage.getItem('token'))
        event.stopPropagation();
        const token = 'Bearer ' + localStorage.getItem('token');
        const url = `http://localhost:5000/api/v1/user/follow/${user_id}`;
        const {data,error} = await useFetch(url, {
            method: 'POST',
            headers: {
                Authorization: token
            },
        });
        // console.log(data);
        if (data.value.success === false) {
            console.error('Error following user:');
        }else{
            console.log(data.value);
            followed.value.push(user_id);
        }
        
        
    } catch (err) {
        console.error('Unexpected error following user:', err);
        error.value = err;
    }
}
onMounted(() => {
    fetchSuggestions();
    // console.log(users.value);
});

const unfollow = async (user_id,event) => {
    try {
        event.stopPropagation();
        const token = 'Bearer ' + localStorage.getItem('token');
        const url = `http://localhost:5000/api/v1/user/unfollow/${user_id}`;
        const {data,error} = await useFetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: token
            },
        });
        // console.log(data);
        if (data.value.success === false) {
            console.error('Error unfollowing user:');
        }else{
            followed.value.splice(followed.value.indexOf(user_id),1);
        }
  } catch (err) {
    console.error('Unexpected error following user:', err);
    error.value = err;
  }
}

// console.log(users.value);

</script>


<template>
    <div class="border-white flex flex-col">
        <input class="bg-slate-800 rounded-3xl mt-4 items-start justify-start text-left p-3 ml-8 mr-14" placeholder="Search" type="text">
        <div class="border-white ml-10 mt-10 flex flex-col gap-3">
            <h1 class="font-bold text-xl text-left">Whats happening</h1>
            <div class="text-left">
                <p class="text-gray-600">Trending in India</p>
                <h3>Ullu</h3>
                <p class="text-gray-600">Trending with #SRHvsGT, #KiaraAdvani</p>
            </div>
            <div class="text-left">
                <p class="text-gray-600">Trending in India</p>
                <h3>Ullu</h3>
                <p class="text-gray-600">Trending with #SRHvsGT, #KiaraAdvani</p>
            </div>
            <div class="text-left">
                <p class="text-gray-600">Trending in India</p>
                <h3>Ullu</h3>
                <p class="text-gray-600">Trending with #SRHvsGT, #KiaraAdvani</p>
            </div>
            <NuxtLink class="text-left text-blue-500">Show more</NuxtLink>
        </div>
        <div class="ml-10 mt-10 flex flex-col gap-2">
            <h1 class="text-left font-bold text-xl">Who to follow</h1>
            <div v-for="user in users" @click="navigateTo(`/profile/${user.user_id}`)" class="bg-zinc-950 cursor-pointer flex text-slate-700 text-center font-bold p-2 mt-2 rounded-2xl w-4/6">
                <img src="~/assets/images/userimage.jpg" alt="" class="h-12 w-12 rounded-full">
                <div class="flex flex-col">
                    <span class="ml-2 text-white">{{user.name}}</span>
                    <span class="ml-2 font-medium">@{{user.username}}</span>
                </div>
                <div v-if="!followed.includes(user.user_id)" class="bg-white ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-1/2" @click="follow(user.user_id,$event)">Follow</div>
                <div v-else class="bg-white ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-1/2" @click="unfollow(user.user_id,$event)">unFollow</div>
            </div>
          
            <NuxtLink class="text-left text-blue-500">Show more</NuxtLink>
        </div>
    </div>
</template>