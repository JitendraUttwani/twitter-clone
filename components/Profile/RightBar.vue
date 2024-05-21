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
            <div class="bg-zinc-950 cursor-pointer flex text-slate-700 text-center font-bold p-2 mt-2 rounded-2xl w-4/6">
                <img src="~/assets/images/photo.jpg" alt="" class="h-12 w-12 rounded-full">
                <div class="flex flex-col">
                    <span class="ml-2 text-white">Jitendra Uttwani</span>
                    <span class="ml-2 font-medium">@JitendraUttwani</span>
                </div>
                <div class="bg-white ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 justify-center items-center mt-4 rounded-2xl w-1/2" @click="">Follow</div>
            </div>
            <div class="bg-zinc-950 cursor-pointer flex text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-4/6">
                <img src="~/assets/images/photo.jpg" alt="" class="h-12 w-12 rounded-full">
                <div class="flex flex-col">
                    <span class="ml-2 text-white">Jitendra Uttwani</span>
                    <span class="ml-2 font-medium">@JitendraUttwani</span>
                </div>
                <div class="bg-white ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="">Follow</div>
            </div>
            <div class="bg-zinc-950 cursor-pointer flex text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-4/6">
                <img src="~/assets/images/photo.jpg" alt="" class="h-12 w-12 rounded-full">
                <div class="flex flex-col">
                    <span class="ml-2 text-white">Jitendra Uttwani</span>
                    <span class="ml-2 font-medium">@JitendraUttwani</span>
                </div>
                <div class="bg-white ml-5 cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="">Follow</div>
            </div>
            <NuxtLink class="text-left text-blue-500">Show more</NuxtLink>
        </div>
    </div>
</template>