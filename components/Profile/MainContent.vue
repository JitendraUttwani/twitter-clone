<script setup>


const props = defineProps({
  posts: {
    type: Array,
  },
})

</script>



<template>
    <div class="col-start-2 col-end-4 border border-gray-600 flex flex-col h-full">
        <div class="flex border border-gray-600">
            <div class="border p-3 w-1/2 border-gray-600 text-center">
                For you
            </div>
            <div class="border w-1/2 p-3 border-gray-600 text-center">
                Following
            </div>
        </div>
        <div class="flex border w-full border-gray-600">
            <PostTweet />
        </div>
        <div class="border text-blue-500 p-3 border-gray-600 text-center">
            Show All posts
        </div>
        <div v-for="post in posts" :key="post.post_id">
            <Post :post="post" />
        </div>
    </div>
</template>