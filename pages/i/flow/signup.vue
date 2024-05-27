<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const name = ref('');
const email = ref('');
const password = ref('');
const bio = ref('');
const location = ref('');
const username = ref('');
const accountExists = ref(false);

const checkAccountExists = async (field, value) => {
  const { data, error } = await useFetch(`http://localhost:5000/api/v1/auth/check-${field}`, {
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

const signup = async () => {
  if (!name.value || !username.value || !email.value || !password.value) {
    return alert("Please enter your details correctly");
  }

  try {
    const emailExists = await checkAccountExists('email', email.value);
    console.log(emailExists);
    if (!emailExists) {
      alert('Account with this email already exists. Please login');
      return router.push('/i/flow/login');
    }

    const usernameExists = await checkAccountExists('username', username.value);
    if (!usernameExists) {
      return alert('Username already taken. Please choose another one');
    }

    const { data, error } = await useFetch('http://localhost:5000/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
        bio: bio.value,
        location: location.value
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
            localStorage.setItem('token', data.value.token);
            console.log(data.value.data);
            localStorage.setItem('user', JSON.stringify(data.value.data));
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
      <input class="bg-inherit border text-white font-bold p-4 mt-6 w-1/2 h-14" type="text" v-model="name" placeholder="Name" />
      <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="text" v-model="username" placeholder="Username" />
      <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="text" v-model="email" placeholder="Email" />
      <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="password" v-model="password" placeholder="Password" />
      <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="text" v-model="bio" placeholder="Bio" />
      <input class="bg-inherit border text-white font-bold p-4 mt-4 w-1/2 h-14" type="text" v-model="location" placeholder="Location" />
      <div class="bg-white cursor-pointer text-slate-700 font-bold text-center p-2 mt-4 rounded-2xl w-1/2" @click="signup">Sign up</div>
    </div>
  </div>
</template>

<style scoped>
</style>
