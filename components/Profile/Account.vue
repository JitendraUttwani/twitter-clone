<script setup>

const props = defineProps(['id'])
console.log(props.id);
</script>



<template>
    <div class="col-start-2 col-end-4 border-gray-600 flex flex-col h-full">
        <div class="flex">
            <h1 class="m-4 px-2">I</h1>
            <div class="flex flex-col my-2 mx-10">
                <h1 class="font-bold text-lg">Jitendra Uttwani</h1>
                <p class="text-light text-sm text-left text-gray-400">0 posts</p>
            </div>
        </div>
        <img class="absolute h-36 w-36 z-50 rounded-full top-44 left-96 m-3" src="~/assets/images/photo.jpg" alt="">
        <div class="bg-zinc-800 h-48 w-full">
            
        </div>
        <div class="flex flex-col border-gray-600 bg-inherit h-72">
            <div class="flex justify-between">
                <div class="mt-20 ml-6">
                    <h1 class="font-bold text-left mt-2 text-lg">Jitendra Uttwani</h1>
                    <p class="text-gray-400 text-sm">@JitendraUttwani</p>
                </div>
                <div class="border bg-inherit justify-around border-white mr-4 text-gray-100 h-10 cursor-pointer text-center font-bold p-2 mt-4 rounded-2xl w-36" @click="">Edit Profile</div>
            </div>
            <div class="ml-5 mt-4">
                <p class="text-left text-gray-200">Software Engineer @ Sparsh Magic | Ex Software Developer at Persistent Systems | MERN Stack, React, Node.js, PostgreSQL, AWS, DSA</p>
                <div class="flex justify-between mt-1">
                    <p class="text-gray-400">Software developer</p>
                    <p class="text-gray-400 mr-3">Joined April 2024</p>
                </div>
                <div class="mt-2 flex">
                    <p class="text-gray-400"><span class="text-gray-100">58</span> Following</p>
                    <p class="text-gray-400 ml-3"><span class="text-gray-100">1</span> Follower</p>
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
        <div class="ml-6 mt-3 flex flex-col gap-2">
            <h1 class="text-left font-bold text-xl">Who to follow</h1>
            
            <div class="bg-zinc-950 cursor-pointer flex text-slate-700 text-left font-bold py-2 mt-4 rounded-2xl w-4/6">
                
                <img src="~/assets/images/photo.jpg" alt="" class="h-12 w-12 rounded-full">
                <div class="flex flex-col px-3">
                    <span class="ml-2 text-left text-white">Jitendra Uttwani</span>
                    <span class="ml-2 font-medium">@JitendraUttwani</span>
                    <span class="ml-2 font-medium text-gray-200">Software Engineer and Full stack web developer</span>
                </div>
                <!-- <i class="fa-solid fa-ellipsis"></i> -->
                <!-- <div class="bg-white ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="">Follow</div> -->
                <div class="relative left-56 bg-white h-10 ml-960 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-36" @click="">Follow</div>
                <!-- <div class="bg-white h-10 ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-36" @click="">Follow</div> -->
            </div>
            <div class="bg-zinc-950 cursor-pointer flex text-slate-700 text-left font-bold py-2 mt-4 rounded-2xl w-4/6">
                <img src="~/assets/images/photo.jpg" alt="" class="h-12 w-12 rounded-full">
                <div class="flex flex-col px-3">
                    <span class="ml-2 text-left text-white">Jitendra Uttwani</span>
                    <span class="ml-2 font-medium">@JitendraUttwani</span>
                    <span class="ml-2 font-medium text-gray-200">Software Engineer and Full stack web developer</span>
                </div>
                <!-- <i class="fa-solid fa-ellipsis"></i> -->
                <!-- <div class="bg-white ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="">Follow</div> -->
                <div class="relative left-56 bg-white h-10 ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-36" @click="">Follow</div>
                <!-- <div class="bg-white h-10 ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-36" @click="">Follow</div> -->
            </div>
            <div class="bg-zinc-950 cursor-pointer flex text-slate-700 text-left font-bold py-2 mt-4 rounded-2xl w-4/6">
                <img src="~/assets/images/photo.jpg" alt="" class="h-12 w-12 rounded-full">
                <div class="flex flex-col px-3">
                    <span class="ml-2 text-left text-white">Jitendra Uttwani</span>
                    <span class="ml-2 font-medium">@JitendraUttwani</span>
                    <span class="ml-2 font-medium text-gray-200">Software Engineer and Full stack web developer</span>
                </div>
                <!-- <i class="fa-solid fa-ellipsis"></i> -->
                <!-- <div class="bg-white ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="">Follow</div> -->
                <div class="relative left-56 bg-white h-10 ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-36" @click="">Follow</div>
                <!-- <div class="bg-white h-10 ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-36" @click="">Follow</div> -->
            </div>
            <NuxtLink class="text-left text-blue-500">Show more</NuxtLink>
        </div>
        
        <!-- <div class="bg-white h-10 ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-36" @click="">Follow</div> -->
        
    </div>
</template>