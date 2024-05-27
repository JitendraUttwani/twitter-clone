<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let user = ref(null);
let accountExists = ref(false);
let email = ref('');
let password = ref('');
const router = useRouter();

const nextStep = async () => {
    if (!email.value) {
        return alert('Please enter an email');
    }

    try {
        const { data, error } = await useFetch('http://localhost:5000/api/v1/auth/check-email', {
            method: 'POST',
            body: { email: email.value },
        });

        if (error.value) {
            throw new Error(error.value);
        }
        // console.log(data.value);
        if (data.value.data) {
            accountExists.value = true;
        } else {
            alert('Email not found. Please sign up.');
            router.push('/i/flow/signup');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again.');
    }
};

const login = async () => {
    if (!email.value || !password.value) {
        return alert('Please enter your email and password');
    }

    try {
        const { data, error } = await useFetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            body: { email: email.value, password: password.value },
        });

        if (error.value) {
            throw new Error(error.value);
        }

        if (data.value.token) {
            localStorage.setItem('token', data.value.token);
            console.log(data.value.data);
            localStorage.setItem('user', JSON.stringify(data.value.data));
            router.push('/home');
        } else {
            alert('Incorrect email or password. Please try again.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again.');
    }
};
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


