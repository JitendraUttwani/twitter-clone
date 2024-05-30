<script setup>
definePageMeta({
    middleware: ['auth'],
    layout: 'home',
})

</script>

<template>
    <ProfileMainContent />
</template>