<script setup>

const arr = ['Home', 'Explore', 'Notifications', 'Messages', 'Grok', 'Lists', 'Communities', 'Premium', 'Profile', 'More'];

const user = ref(null);

const { data: userData } = await useAsyncData('user', () => {
  const userCookie = getCookie('user');
  return userCookie;
});

if (userData.value) {
  user.value = userData.value;
  // console.log(user.value);
}

</script>


<template>
    <div class="flex flex-col items-center border border-gray-600">
            <img src="~/assets/images/twitter-logo.jpg" class="h-16 w-20"/>
            <ul class="flex flex-col gap-2 mt-0 text-xl">
                <li v-for="(ele,index) in arr" :key="index" class="">
                    <NuxtLink class="flex items-center gap-1 py-2 px-4 w-full hover:bg-gray-800 rounded-xl transition-colors" :to="`/${ele.toLowerCase() === 'profile' ? useCookie('user').value.user_id : 'home'}`">{{ ele }}</NuxtLink>
                </li>
            </ul>
            <div class="bg-blue-500 cursor-pointer text-white font-bold text-center p-3 mt-2 rounded-3xl w-4/6">Post</div>
            <NuxtLink :to="`/${user.user_id}`" v-if="user" class="bg-zinc-950 cursor-pointer flex text-slate-700 text-center font-bold p-2 mt-2 rounded-2xl w-4/6 hover:bg-gray-800 transition-colors">
                    <img src="~/assets/images/userimage.jpg" alt="" class="h-12 w-12 rounded-full">
                    <div class="flex flex-col">
                        <span class="ml-2 text-white">{{user.name}}</span>
                        <span class="ml-2 font-medium">@{{user.username}}</span>
                    </div>
                    <!-- <font-awesome-icon :icon="['fas', 'ellipsis']" /> -->
                    <!-- <font-awesome icon="ellipsis" /> -->
                    <!-- <i class="fa-solid fa-ellipsis"></i> -->
           </NuxtLink>
    </div>
</template>