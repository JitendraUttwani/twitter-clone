



<template>
    <div class="flex border-gray-600 w-full border-b-2">
        <div class="p-3 border-r-2 border-gray-600 cursor-pointer" @click="navigateTo(`/profile/${post.user_id}`)">
            <img v-if="post.user.profilePicture" :src="post.user.profilePicture" alt="" class="h-12 w-12 rounded-full">
            <img v-else src="~/assets/images/userimage.jpg" alt="" class="h-12 w-12 rounded-full">
        </div>
        <div class="flex flex-col">
            <div class="flex p-2 cursor-pointer" @click="navigateTo(`/profile/${post.user_id}`)">
                <h1 class="">
                    {{ post.user.name }} 
                </h1>
                <span class="ml-2 text-gray-600">@{{ post.user.username }}</span>
                <span class="ml-2 text-gray-600"> . {{ formatDate(post.created_at) }}</span>
                <!-- <font-awesome-icon class="ml-96 text-xl cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="ellipsis" /> -->
            </div>
            <p class="text-left pl-2">
                {{ post.message }}
            </p>
            <div v-if="post.image" class="m-4 border rounded-2xl w-5/6">
                <img class="object-fit h-72 w-full rounded-2xl"src="~/assets/images/twitter-logo.jpg"/>
            </div>
            <div>
                <div>
                    <ul class="flex flex-row p-4 list-none gap-8 justify-between items-between">
                        <!-- <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="comment-dots" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="retweet" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="heart" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="chart-simple" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="bookmark" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="arrow-up-from-bracket" /> -->
                    </ul>
                </div>
            </div> 
        </div>
    </div>
</template>



<script>
import { formatDistanceToNow } from 'date-fns';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return formatDistanceToNow(new Date(date), { addSuffix: true }).replace('about ', '');
    },
    navigateTo(url) {
      this.$router.push(url);
    },
  },
};
</script>