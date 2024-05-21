<template>
    <div class="grid grid-cols-4 text-center h-full">
        <ProfileLeftBar />
        <ProfileAccount :id="$route.params.id"/>
        <ProfileRightBar />
    </div>
</template>