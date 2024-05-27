<script setup>

definePageMeta({
    middleware: ['auth']
})


</script>


<template>
    <div class="grid grid-cols-4 text-center h-full">
        <ProfileLeftBar />
        <ProfileAccountId :id="$route.params.id"/>
        <ProfileRightBar />
    </div>
</template>