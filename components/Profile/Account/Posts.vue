<script setup>

const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
})

</script>

<template>
    <div v-if="posts && posts.length" v-for="post in posts" :key="post.post_id">
        <Post :post="post" />
    </div>
    <div v-else class="flex flex-col justify-center items-center">
        <h1 class="text-gray-600">No Posts</h1>
    </div>
</template>
