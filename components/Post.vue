<template>
    <div class="flex border-gray-600 w-full border-b-2">
        <NuxtLink :to="`/${post.user_id}`">
            <div class="p-3 border-r-2 border-gray-600 cursor-pointer">
                <img v-if="post.user.profilePicture" :src="post.user.profilePicture" alt="" class="h-12 w-12 rounded-full">
                <img v-else src="~/assets/images/userimage.jpg" alt="" class="h-12 w-12 rounded-full">
            </div>
        </NuxtLink>
        <div class="flex flex-col">
            <NuxtLink :to="`/${post.user_id}`">
                <div class="flex p-2 cursor-pointer">
                    <h1 class="">
                        {{ post.user.name }} 
                    </h1>
                    <span class="ml-2 text-gray-600">@{{ post.user.username }}</span>
                    <span class="ml-2 text-gray-600"> . {{ formatDate(post.created_at) }}</span>
                    <!-- <font-awesome-icon class="ml-96 text-xl cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="ellipsis" /> -->
                </div>
            </NuxtLink>
            <p class="text-left pl-2">
                {{ post.message }}
            </p>
            <div v-if="post.image" class="m-4 border rounded-2xl w-5/6">
                <img class="object-fit h-72 w-full rounded-2xl"src="~/assets/images/twitter-logo.jpg"/>
            </div>
            <div>
                <div>
                    <ul class="flex flex-row p-3 list-none gap-8 justify-between items-between border-gray-600 border-l-2">
                        <!-- <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="comment-dots" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="retweet" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="chart-simple" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="bookmark" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="arrow-up-from-bracket" /> -->
                        <div>
                            <font-awesome v-if="!isLiked" class="cursor-pointer rounded-full hover:bg-gray-800 transition-colors" icon="thumbs-up" @click="likePost(post.post_id)" />
                            <font-awesome v-if="isLiked" class="cursor-pointer rounded-full hover:bg-gray-800 transition-colors text-blue-900" icon="thumbs-up" @click="unlikePost(post.post_id)" />
                            <span class="ml-2">{{ likeCount }}</span>
                        </div>
                    </ul>
                </div>
            </div> 
        </div>
    </div>
</template>



<script setup>
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';


const userStore = useUserStore();

const {likedPosts} = userStore;

const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
});


const isLiked = computed(() => userStore.likedPosts.includes(props.post.post_id));
const likeCount = ref(parseInt(props.post.likeCount));

// console.log(props.post);

const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true }).replace('about ', '');
}

// const likedPosts = ref([]);



// const fetchAllLikedPosts = async () => {
//     try {
//         const userId = useCookie('user').value.user_id;
//         const token = useCookie('token').value;
        
//         const { data, error } = await useFetch(`https://twitter-clone-api-6kjm.onrender.com/api/v1/user/${userId}/liked-posts`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         if (error.value) {
//             console.error('Error fetching user profile', error.value);
//             return;
//         }

//         if (data.value.success) {
//             console.log(data.value);
//             console.log(data.value.data);
//             likedPosts.value = data.value.data;
//             userStore.setLikedPosts(props.post.post_Id);
//         } else {
//             console.error('Error fetching user profile');
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
onMounted(async () => {
    console.log(userStore.isFetched);
    if(!userStore.isFetched) {
        await userStore.fetchUserData();
        userStore.fetchComplete();
    console.log(userStore.likedPosts);
    }
})


const likePost = async (post_id) => {
    try {
        const token = 'Bearer ' + getCookie('token');
        const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/post/${post_id}/like`;
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
            userStore.setLikedPosts(post_id);
            likeCount.value++;
        }
        
        
    } catch (err) {
        console.error('Unexpected error following user:', err);
    }
}

const unlikePost = async (post_id) => {
    try {
        const token = 'Bearer ' + getCookie('token');
        const url = `https://twitter-clone-api-6kjm.onrender.com/api/v1/post/${post_id}/unlike`;
        const {data,error} = await useFetch(url, {
            method: 'DELETE',
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
            userStore.removeLikedPosts(post_id);
            likeCount.value--;
        }
        
        
    } catch (err) {
        console.error('Unexpected error following user:', err);
    }
}

const checkLiked = (post_id) => {
    return likedPosts.includes(parseInt(post_id));
}

</script>