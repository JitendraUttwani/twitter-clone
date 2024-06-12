<script setup>
import axios from 'axios'
import {format} from 'date-fns'
import { useUserStore } from '@/stores/user';

const props = defineProps({
    id: Number
})

const user = ref({})
const userPosts = ref([])


const posts = computed(() => {
    return userPosts.value.map(post => ({
        user: user.value,
        ...post
    }));
});

const userStore = useUserStore();

const followerCount = computed(() => user.value.followerCount);
const followingCount = computed(() => user.value.followingCount);



const isLoggedInUser = computed(() => useCookie('user').value.user_id === user.value.user_id);
// const posts = computed(() => {
//     const newPosts = postDetails.value.map((post) => {
//         return {
//             user: user.value,
//             ...post
//         }
//     })
//     return newPosts;
// })
// import { ProfileAccountFollowers, ProfileAccountFollowings, ProfileAccountLiked, ProfileAccountPosts } from '#components';

// const user = ref({});
const fetchUserProfile = async () => {
    try{
        const response = await axios.get(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${props.id}`, {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`
          }
        })
    
        if (response.data.success) {
            // console.log(response.data.data);
            user.value = response.data.data;
            userStore.setCurrentUserFollowers(response.data.data.followerCount);
            userStore.setCurrentUser(response.data.data.user_id)
            user.value.created_at = format(new Date(user.value.created_at), 'dd MMMM yyyy');
        } else {
            console.error('Error fetching user profile')
        }
    }catch(err){
        console.error(err);

    }
  
}


const fetchPosts = async () => {
    try{
        const response = await axios.get(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${props.id}/posts`, {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`
          }
        })
    
        if (response.data.success) {
            // console.log(response.data.data);
            userPosts.value = response.data.data;

        } else {
          console.error('Error fetching user profile');
        }
    }catch(err){
        console.error(err);
    }
}
// const userPosts = ref([]);
// const likedPosts = ref([]);
// const usersFollowed = ref([]);
// const usersFollowing = ref([]);


const {fetchUserFollowings} = useFetchData();

onMounted(async () => {
    // if(!userStore.isFetched){
    //     await userStore.fetchUserData();
    //     await userStore.fetchComplete();
    // }
    await fetchUserFollowings();
    await fetchUserProfile();
    await fetchPosts();
});


const currentTab = ref('Posts');

const tabs = ['Posts','Followers','Followings','Liked'];

console.log(userStore.followed);
const isFollowed = computed(() => userStore.followed.includes(props.id));
// console.log(user.value);
// console.log(isFollowe)

const follow = async (user_id) => {
    try {
        console.log(user_id);
        console.log(getCookie('token'))
        // event.stopPropagation();
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
            userStore.addFollowings(user_id)
            userStore.setCurrentUserFollowers(userStore.currentUserFollowers + 1);
            // followed.value.push(user_id);
        }
        
        
    } catch (err) {
        console.error('Unexpected error following user:', err);
    }
}


const unfollow = async (user_id) => {
    try {
        // event.stopPropagation();
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
            userStore.removeFollowings(user_id);
            userStore.setCurrentUserFollowers(userStore.currentUserFollowers - 1);
            // followed.value.splice(followed.value.indexOf(user_id),1);
        }
  } catch (err) {
    console.error('Unexpected error following user:', err);
  }
}




</script>




<template>
    <div v-if="user && Object.keys(user).length > 0" class="col-start-2 col-end-4 border-gray-600 flex flex-col h-full">
        <div class="flex">
            <h1 class="m-4 px-2">I</h1>
            <div class="flex flex-col my-2 mx-10">
                <h1 class="font-bold text-lg">{{ user.name }}</h1>
                <p class="text-light text-sm text-left text-gray-400">{{ userPosts.length }} posts</p>
            </div>
        </div>
        <img class="absolute h-36 w-36 z-50 rounded-full top-44 left-96 m-3" src="~/assets/images/userimage.jpg" alt="">
        <div class="bg-zinc-800 h-48 w-full"></div>
        <div class="flex flex-col border-gray-600 bg-inherit h-64">
            <div class="flex justify-between">
                <div class="mt-20 ml-6">
                    <h1 class="font-bold text-left mt-2 text-lg">{{ user.name }}</h1>
                    <p class="text-gray-400 text-sm">@{{ user.username }}</p>
                </div>
                <div v-if="isLoggedInUser" class="border bg-inherit justify-around border-white mr-4 text-gray-100 h-10 cursor-pointer text-center font-bold p-2 mt-4 rounded-2xl w-36" @click="">Edit Profile</div>
                <div v-else>
                    <div v-if="!isFollowed" class="border bg-inherit justify-around border-white mr-4 text-gray-100 h-10 cursor-pointer text-center font-bold p-2 mt-4 rounded-2xl w-36" @click="follow(user.user_id)">Follow</div>
                    <div v-else class="border bg-inherit justify-around border-white mr-4 text-gray-100 h-10 cursor-pointer text-center font-bold p-2 mt-4 rounded-2xl w-36" @click="unfollow(user.user_id)">unFollow</div>
                </div>
            </div>
            <div class="ml-5 mt-4">
                <p class="text-left text-gray-200">{{ user.bio }}</p>
                <div class="flex justify-between mt-1">
                    <p class="text-gray-400">Software developer</p>
                    <p class="text-gray-400 mr-3">Joined {{ format(new Date(user.created_at), 'dd MMMM yyyy') }}</p>
                </div>
                <div class="mt-2 flex">
                    <p class="text-gray-400"><span class="text-gray-100">{{ (isLoggedInUser ? userStore.followed.length : user.followingCount) }}</span> Following</p>
                    <p class="text-gray-400 ml-3"><span class="text-gray-100">{{ (!isLoggedInUser ? userStore.currentUserFollowers : user.followerCount) }}</span> Follower</p>
                </div>
            </div>
        </div>
        
        <div class="border text-medium font-semibold flex justify-around text-gray-500 border-gray-600 text-center mt-0">
            <div v-for="tab in tabs" :key="tab" class="text-gray-400 w-1/4 p-4 cursor-pointer hover:bg-zinc-900" @click="currentTab = tab" :class="{ 'activeTab': currentTab === tab }">{{ tab }}</div>
        </div>
        <ProfileAccountPosts v-if="currentTab === 'Posts'" :posts="posts"/>
        <ProfileAccountFollowers v-if="currentTab === 'Followers'" :userId="parseInt(id)"/>
        <ProfileAccountFollowings v-if="currentTab === 'Followings'" :userId="parseInt(id)"/>
        <ProfileAccountLikedPosts v-if="currentTab === 'Liked'" :userId="parseInt(id)"/>

        <!-- <component :is="currentTab.comp" v-bind:[currentTab.prop.name]="currentTab.prop.value"/> -->
    </div>
    <div v-else class="col-start-2 col-end-4 border-gray-600 flex flex-col h-full">
        <h1>Loading....</h1>
    </div>
</template>


<style scoped>
    .activeTab {
        color: white;
        border-bottom: 4px solid blue;
    }
</style>
