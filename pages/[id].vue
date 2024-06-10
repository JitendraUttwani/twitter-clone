<script setup>

definePageMeta({
    middleware: ['auth'],
    layout: 'home',
})


</script>


<template>
    <ProfileAccountId :id="parseInt($route.params.id)"/>
</template>