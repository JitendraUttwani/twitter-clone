<script setup>
let text = ref('');

</script>



<template>
    <div class="flex h-40 w-full">
        <div class="p-3 border-r-2 border-gray-600">
            <img src="~/assets/images/photo.jpg" alt="" class="h-12 w-12 rounded-full">
        </div>
        <div class="flex flex-col">
            <div class="w-full h-4/6">
                <textarea rows="80" cols="100" placeholder="What is happening?" class="border-none outline-none p-1 bg-inherit w-full h-4/6"></textarea>
            </div>
            <div class="flex flex-row justify-between">
                <div>
                    <ul class="flex flex-row p-4 list-none gap-8 justify-between items-between">
                        <li>I</li>
                        <li>I</li>
                        <li>I</li>
                        <li>I</li>
                        <li>I</li>
                    </ul>
                </div>
                <div class="bg-blue-500 items-center justify-center cursor-pointer text-white font-bold text-center px-2 pt-2 pb-1 mb-3 mr-2 rounded-3xl w-1/6">
                    Post
                </div>
            </div>
        </div>
    </div>
</template>