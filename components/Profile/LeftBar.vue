<script setup>
const arr = ['Home', 'Explore', 'Notifications', 'Messages', 'Grok', 'Lists', 'Communities', 'Premium', 'Profile', 'More'];

</script>


<template>
    <div class="flex flex-col items-center border border-gray-600">
        <!-- <div class="fixed"> -->
            <img src="~/assets/images/twitter-logo.jpg" class="h-16 w-20"/>
            <ul class="flex flex-col gap-6 mt-6 font text-xl">
                <NuxtLink :to="`/${ele.toLowerCase()}`" v-for="ele in arr">{{ ele }}</NuxtLink>
            </ul>
            <div class="bg-blue-500 cursor-pointer text-white font-bold text-center p-3 mt-4 rounded-3xl w-4/6">Post</div>
            <div class="bg-zinc-950 cursor-pointer flex text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-4/6">
                <img src="~/assets/images/photo.jpg" alt="" class="h-12 w-12 rounded-full">
                <div class="flex flex-col">
                    <span class="ml-2 text-white">Jitendra Uttwani</span>
                    <span class="ml-2 font-medium">@JitendraUttwani</span>
                </div>
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        <!-- </div> -->
    </div>
</template>