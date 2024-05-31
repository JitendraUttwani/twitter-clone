<script setup>
import axios from 'axios'
import {format} from 'date-fns'


const user = ref({})
const postDetails = ref([])
const numOfFollowers = ref(0);
const numOfFollowings = ref(0);

const posts = computed(() => postDetails.value.map((post) => ({user: user.value,...post})));


const fetchUserProfile = async () => {
    try{

        const response = await axios.get('https://twitter-clone-api-6kjm.onrender.com/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${useCookie('token').value}`
          }
        })
        // console.log(response.data);
    
        if (response.data.success) {
            console.log(response.data.data)
          user.value = response.data.data.user;
          user.value.created_at = format(new Date(user.value.created_at), 'dd MMMM yyyy');
          postDetails.value = response.data.data.userPosts;
          numOfFollowers.value = response.data.data.followers.length;
          numOfFollowings.value = response.data.data.followings.length;
        //   console.log(user.value);
        //   console.log(posts.value);
        } else {
          console.error('Error fetching user profile:', error.value)
        }
    }catch(err){
        console.error(err);

    }
  
}

onMounted(() => {
    fetchUserProfile();
})
</script>




<template>
    <div v-if="user && Object.keys(user).length > 0" class="col-start-2 col-end-4 border-gray-600 flex flex-col h-full">
        <div class="flex">
            <h1 class="m-4 px-2">I</h1>
            <div class="flex flex-col my-2 mx-10">
                <h1 class="font-bold text-lg">{{user.name}}</h1>
                <p class="text-light text-sm text-left text-gray-400">{{postDetails.length}} posts</p>
            </div>
        </div>
        <img class="absolute h-36 w-36 z-50 rounded-full top-44 left-96 m-3" src="~/assets/images/userimage.jpg" alt="">
        <div class="bg-zinc-800 h-48 w-full">
            
        </div>
        <div class="flex flex-col border-gray-600 bg-inherit h-72">
            <div class="flex justify-between">
                <div class="mt-20 ml-6">
                    <h1 class="font-bold text-left mt-2 text-lg">{{user.name}}</h1>
                    <p class="text-gray-400 text-sm">@{{user.username}}</p>
                </div>
                <div class="border bg-inherit justify-around border-white mr-4 text-gray-100 h-10 cursor-pointer text-center font-bold p-2 mt-4 rounded-2xl w-36" @click="">Edit Profile</div>
            </div>
            <div class="ml-5 mt-4">
                <p class="text-left text-gray-200">{{user.bio}}</p>
                <div class="flex justify-between mt-1">
                    <p class="text-gray-400">Software developer</p>
                    <p class="text-gray-400 mr-3">Joined {{user.created_at}}</p>
                </div>
                <div class="mt-2 flex">
                    <p class="text-gray-400"><span class="text-gray-100">{{numOfFollowings}}</span> Following</p>
                    <p class="text-gray-400 ml-3"><span class="text-gray-100">{{numOfFollowers}}</span> Follower</p>
                </div>
            </div>
        </div>
        
        <div class="border text-medium font-semibold flex justify-around text-gray-500 p-3 border-gray-600 text-center">
            <p class="text-gray-400">Posts</p>
            <p class="text-gray-400">Replies</p>
            <p class="text-gray-400">Highlights</p>
            <p class="text-gray-400">Articles</p>
            <p class="text-gray-400">Media</p>
            <p class="text-gray-400">Likes</p>           
        </div>
        <div v-for="post in posts" :key="post.post_id">
            <Post :post="post" />
        </div> 
    </div>
</template>