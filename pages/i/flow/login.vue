<script setup>
import {users} from '~/assets/data/users.js'
let user = ref(null);
let accountExists = ref(false);
let email = ref('');
let password = ref('');
const nextStep = () => {
    const result = users.find(user => user.email === email.value);
    if(result){
        user.value = result;
        accountExists.value = true;
    }else{
        alert('Please enter correct email');
    }
}
const login = () => {
    if(user && user.value.password === password.value){
        return navigateTo('/home');
    }
    alert('Please enter correct password');
}
</script>




<template>
<div class="w-full h-screen bg-slate-700 flex flex-col">
    <div v-if="!accountExists" class="login-part rounded-3xl gap-4 m-auto flex flex-col justify-center items-center shadow-xl bg-zinc-950 h-5/6 w-3/6">
        <h1 class="text-3xl font-semibold">Sign In to X</h1>
        <div class="bg-white cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="oauthGoogle">Sign up with Google</div>
        <div class="bg-white cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="oauthApple">Sign up with Apple</div>
        <p class="text-center mt-2 w-1/2">------------------or-----------------</p>
        <input class="bg-inherit border text-white  font-bold p-4 mt-4 w-1/2"type="text" v-model="email" placeholder="Email"/>
        <div class="bg-white cursor-pointer text-slate-700 font-bold text-center p-2 mt-4 rounded-2xl w-1/2" @click="nextStep">Next</div>
        <div class="bg-zinc-950 border cursor-pointer border-white-700 font-bold text-white text-center p-2 mt-4 rounded-2xl w-1/2" @click="signin">Forgot Password?</div>
        <p class="text-gray-500 text-sm py-1 w-1/2 text-wrap">Don't have an account? <NuxtLink to="/i/flow/signup" class="text-blue-500">Sign Up</NuxtLink></p>
    </div>
    <div v-else class="login-part rounded-3xl gap-4 m-auto flex flex-col justify-center items-center shadow-xl bg-zinc-950 h-5/6 w-3/6">
        <h1 class="text-3xl font-semibold">Sign In to X</h1>
        <input class="bg-inherit border border-gray-500 text-gray-600  font-bold p-4 mt-4 w-1/2"type="text" v-model="email" placeholder="Phone,email or username" disabled/>
        <input class="bg-inherit border text-white  font-bold p-4 mt-4 w-1/2"type="password" v-model="password" placeholder="Password"/>
        <a href="#" class="text-blue-500 text-left">Forgot Password?</a>
        <div class="bg-white cursor-pointer text-slate-700 font-bold text-center p-2 mt-4 rounded-2xl w-1/2" @click="login">Log in</div>
        <p class="text-gray-500 text-sm py-1 w-1/2 text-wrap">Don't have an account? <NuxtLink to="/i/flow/signup" class="text-blue-500">Sign Up</NuxtLink></p>
    </div>
</div>
</template>


