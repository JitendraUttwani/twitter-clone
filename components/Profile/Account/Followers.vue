<template>
  <div v-if="followers.length">
    <div v-for="follower in followers" :key="follower.user_id" class="flex border-gray-600 w-full border-2">
      <NuxtLink :to="`/${follower.user_id}`">
        <div class="p-3 border-r-2 border-gray-600 cursor-pointer">
          <img v-if="follower.profilePicture" :src="follower.profilePicture" alt="" class="h-12 w-12 rounded-full">
          <img v-else src="~/assets/images/userimage.jpg" alt="" class="h-12 w-12 rounded-full">
        </div>
      </NuxtLink>
      <div class="flex flex-col ml-0 w-5/6">
        <NuxtLink :to="`/${follower.user_id}`" class="flex flex-row justify-between items-end flex-grow border-l-2 border-gray-700">
          <div class="flex flex-col cursor-pointer p-1">
            <h1 class="m-0">
              {{ follower.name }} 
            </h1>
            <span class="text-gray-600">@{{ follower.username }}</span>
            <p class="text-left pl-3 py-2">
              {{ follower.bio }}
            </p>
          </div>
          <div v-if="!isFollowed(follower.user_id)" class="bg-white ml-12 cursor-pointer text-slate-700 align-middle self-center justify-self-center text-center font-bold p-2 justify-center items-center mt-1 h-10 rounded-2xl w-24" @click="follow(follower.user_id, $event)">Follow</div>
          <div v-else class="bg-white ml-12 cursor-pointer text-slate-700 align-middle self-center justify-self-center text-center font-bold p-2 justify-center items-center mt-1 h-10 rounded-2xl w-24" @click="unfollow(follower.user_id, $event)">Following</div>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <h1 class="text-gray-600">No followers</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
});

const followers = ref([]);
const userStore = useUserStore();

const fetchFollowers = async () => {
  try {
    const response = await axios.get(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${props.userId}/followers`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    });

    if (response.data.success) {
      followers.value = response.data.data;
    } else {
      console.error('Error fetching user followers');
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await fetchFollowers();
});

const follow = async (user_id, event) => {
  try {
    event.stopPropagation();
    event.preventDefault();
    const token = 'Bearer ' + getCookie('token');
    const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${user_id}/follow`;
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: token
      }
    });

    if (response.data.success) {
      userStore.addFollowings(user_id);
    } else {
      console.error('Error following user');
    }
  } catch (err) {
    console.error('Unexpected error following user:', err);
  }
};

const unfollow = async (user_id, event) => {
  try {
    event.stopPropagation();
    event.preventDefault();
    const token = 'Bearer ' + getCookie('token');
    const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${user_id}/unfollow`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: token
      }
    });

    if (response.data.success) {
      userStore.removeFollowings(user_id);
    } else {
      console.error('Error unfollowing user');
    }
  } catch (err) {
    console.error('Unexpected error unfollowing user:', err);
  }
};

const isFollowed = (user_id) => {
  return userStore.followed.includes(user_id);
};
</script>
