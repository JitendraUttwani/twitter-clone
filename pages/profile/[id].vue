<script setup>

definePageMeta({
    middleware: ['auth'],
    layout: 'home',
})

</script>


<template>
    <ProfileAccountId :id="$route.params.id"/>
</template>