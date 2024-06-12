<script setup>

import axios from 'axios';
import { onMounted } from 'vue';

const userStore = useUserStore();

// const { followed } = userStore;

// const followedUsers = computed(() => userStore.followed)

// console.log(followed);

const users = ref([]);
// const followed = ref([]);
const fetchSuggestions = async () => {
  try {
    const response = await axios.get('https://twitter-clone-api-6kjm.onrender.com/api/v1/user/suggestions', {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    });
    if (response.data.success) {
      users.value = response.data.data;

    //   console.log(users.value);
    } else {
      console.error('Error fetching suggestions');
      alert('Error fetching suggestions');
    }
    } catch (err) {
        console.error('Unexpected error fetching suggestions:', err);
        alert('Unexpected error fetching suggestions');
    }
};

const {fetchUserFollowings} = useFetchData();

onMounted(async () => {
    // if(!userStore.isFetched){
    //     await userStore.fetchUserData();
    //     userStore.fetchComplete();
    // }
    await fetchUserFollowings();
    await fetchSuggestions();
})


const follow = async (user_id,event) => {
    try {
        event.stopPropagation();
        event.preventDefault();
        const token = 'Bearer ' + getCookie('token');
        const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${user_id}/follow`;
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
            // console.log(data.value);
            // console.log(followed);
            console.log(user_id);
            userStore.addFollowings(user_id);
            if(parseInt(userStore.currentUser) === parseInt(user_id))
                userStore.setCurrentUserFollowers(userStore.currentUserFollowers + 1);
        }
        
        
    } catch (err) {
        console.error('Unexpected error following user:', err);
    }
}

const unfollow = async (user_id,event) => {
    try {
        event.stopPropagation();
        event.preventDefault();
        
        const token = 'Bearer ' + getCookie('token');
        const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${user_id}/unfollow`;
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
            // console.log(followed);
            userStore.removeFollowings(user_id)
            if(parseInt(userStore.currentUser) === parseInt(user_id))
                userStore.setCurrentUserFollowers(userStore.currentUserFollowers - 1);
            // followed.value.splice(followed.value.indexOf(user_id),1);
        }
  } catch (err) {
    console.error('Unexpected error following user:', err);
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
            <p class="text-left text-blue-500">Show more</p>
        </div>
        <div class="ml-10 mt-10 flex flex-col gap-2">
            <h1 class="text-left font-bold text-xl">Who to follow</h1>
            <div v-for="user in users" :key="user.user_id" class="bg-zinc-950 cursor-pointer flex text-slate-700 text-center font-bold p-2 mt-2 rounded-2xl w-4/6">
                <NuxtLink :to="`/${user.user_id}`" class="flex flex-row mr-10">
                    <img src="~/assets/images/userimage.jpg" alt="" class="h-12 w-12 rounded-full">
                    <div class="flex flex-col">
                        <span class="ml-2 text-white">{{user.name}}</span>
                        <span class="ml-2 font-medium">@{{user.username}}</span>
                    </div>
                </NuxtLink>
                <div v-if="!userStore.followed.includes(user.user_id)" class="bg-white ml-12 cursor-pointer text-slate-700 align-middle self-center justify-self-center text-center font-bold p-2 justify-center items-center mt-1 h-10 rounded-2xl w-1/2" @click="follow(user.user_id,$event)">Follow</div>
                <div v-else class="bg-white ml-12 cursor-pointer text-slate-700 align-middle self-center justify-self-center text-center font-bold p-2 justify-center items-center mt-1 rounded-2xl w-1/2" @click="unfollow(user.user_id,$event)">unFollow</div>
            </div>
          
            <p class="text-left text-blue-500">Show more</p>
        </div>
    </div>
</template>