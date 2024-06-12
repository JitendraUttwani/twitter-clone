<script setup>

definePageMeta({
    layout: false,
})


import { useRouter } from 'vue-router';
import { useForm, useField, Form as VForm, Field as VField, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter();


const userStore = useUserStore();

const accountExists = ref(false);

const nameSchema = yup.string().required('Name is required');
const emailSchema = yup.string().email('Invalid email address').required('Email is required');
const passwordSchema = yup.string().min(6, 'Password must be at least 6 characters').required('Password is required');
const bioSchema = yup.string().max(160, 'Bio cannot exceed 160 characters');
const locationSchema = yup.string().max(30, 'Location cannot exceed 30 characters');
const usernameSchema = yup.string().required('Username is required');

const checkAccountExists = async (field, value) => {
  const { data, error } = await useFetch(`https://twitter-clone-api-6kjm.onrender.com/api/v1/auth/check-${field}`, {
    method: 'POST',
    body: JSON.stringify({ [field]: value }),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(data);
  if (error.value) {
    console.error(error.value);
    throw new Error(`Error checking ${field} existence`);
  }

  return data.value.success;
};

const signup = async (values) => {
  const { name, username, email, password, bio, location } = values;
  if (!name || !username || !email || !password) {
    return alert("Please enter your details correctly");
  }

  try {
    const emailExists = await checkAccountExists('email', email);
    console.log(emailExists);
    if (!emailExists) {
      alert('Account with this email already exists. Please login');
      return router.push('/i/flow/login');
    }

    const usernameExists = await checkAccountExists('username', username);
    if (!usernameExists) {
      return alert('Username already taken. Please choose another one');
    }

    const { data, error } = await useFetch('https://twitter-clone-api-6kjm.onrender.com/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        bio,
        location
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (error.value) {
      console.error(error.value);
      alert('Error creating account');
    } else {
      alert('Account created successfully');
      router.push('/home');
    }

    if (data.value.token) {
        setCookie('token', data.value.token);
        console.log(data.value.data);
        // console.log(data.value.data)
        const {user_id,name,username} = data.value.data;
        setCookie('user',{user_id,name,username}); 
        router.push('/home');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred');
  }
};
</script>

<template>
  <div class="w-full h-screen bg-slate-700 flex flex-col">
    <div v-if="!accountExists" class="login-part rounded-3xl gap-3 m-auto flex flex-col justify-center items-center shadow-xl bg-zinc-950 h-screen w-2/4">
      <h1 class="font-semibold text-4xl">Create your account</h1>
      <VForm @submit="signup" class="flex flex-col gap-2 w-full items-center justify-center">
        <VField name="name" :rules="nameSchema" v-slot="{ field, errors }">
          <input class="bg-inherit border text-white font-bold p-4 mt-6 w-1/2 h-14" type="text" v-bind="field" placeholder="Name" />
          <span class="text-red-500">{{ errors[0] }}</span>
        </VField>

        <VField name="username" :rules="usernameSchema" v-slot="{ field, errors }">
          <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="text" v-bind="field" placeholder="Username" />
          <span class="text-red-500">{{ errors[0] }}</span>
        </VField>

        <VField name="email" :rules="emailSchema" v-slot="{ field, errors }">
          <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="text" v-bind="field" placeholder="Email" />
          <span class="text-red-500">{{ errors[0] }}</span>
        </VField>

        <VField name="password" :rules="passwordSchema" v-slot="{ field, errors }">
          <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="password" v-bind="field" placeholder="Password" />
          <span class="text-red-500">{{ errors[0] }}</span>
        </VField>

        <VField name="bio" :rules="bioSchema" v-slot="{ field, errors }">
          <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="text" v-bind="field" placeholder="Bio" />
          <span class="text-red-500">{{ errors[0] }}</span>
        </VField>

        <VField name="location" :rules="locationSchema" v-slot="{ field, errors }">
          <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="text" v-bind="field" placeholder="Location" />
          <span class="text-red-500">{{ errors[0] }}</span>
        </VField>

        <button type="submit" class="bg-white cursor-pointer text-slate-700 font-bold text-center p-2 mt-4 rounded-2xl w-1/2">Sign up</button>
      </VForm>
    </div>
  </div>
</template>

<style scoped>
</style>
