<script setup>

definePageMeta({
    middleware: ['auth']
})


</script>


<template>
    <div class="grid grid-cols-4 text-center h-full">
        <ProfileLeftBar />
        <ProfileAccount />
        <ProfileRightBar />
    </div>
</template>