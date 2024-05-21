<script setup>
import {users} from '~/assets/data/users.js'
let user = ref(null);
let accountExists = ref(false);
let email = ref('');
let name = ref('');
let password = ref('');
let date = ref(null);
const derivedAge = computed(() => {
    let currYear = new Date().getFullYear();
    let birthYear = parseInt(date.value.substring(0,4));
    return currYear - birthYear;
})
const signup = () => {
    let currYear = new Date().getFullYear();
    console.log(date.value);
    console.log(derivedAge.value);

    if(!name.value || !email.value || !password.value || !date.value){
        return alert("Please enter your details correctly");
    }
    const result = users.find(user => user.email === email.value);
    if(result){
        alert('Account already exists please login');
        return navigateTo('/i/flow/login')
    }else{
        users.push({
            userId: users[users.length - 1].userId + 1,
            name: name.value,
            email: email.value,
            password:  password.value,
            age: derivedAge.value,
            headline: 'I hate chess',
            timestamp: Date.now()
        })
        console.log(users);
        navigateTo('/home');
    }
}
// const login = () => {
//     if(user && user.value.password === password.value){
//         return navigateTo('/home');
//     }
//     alert('Please enter correct password');
// }
</script>


<template>
    <div class="w-full h-screen bg-slate-700 flex flex-col">
        <div v-if="!accountExists" class="login-part rounded-3xl gap-2 m-auto flex flex-col justify-center items-center shadow-xl bg-zinc-950 h-5/6 w-2/4">
            <h1 class="text-3xl font-semibold">Create your account</h1>
            <input class="bg-inherit border text-white  font-bold p-4 mt-4 w-1/2"type="text" v-model="name" placeholder="Name"/>
            <input class="bg-inherit border text-white  font-bold p-4 mt-4 w-1/2"type="text" v-model="email" placeholder="Email"/>
            <NuxtLink href="#" class="text-blue-500 text-left">Use phone instead</NuxtLink>
            <h1>Date of birth</h1>
            <p class="text-gray-500 text-sm py-1 w-1/2 text-wrap">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
            <input class="datepicker-input bg-inherit border text-white  font-bold p-4 mt-4 w-1/2"type="date" id="start" name="trip-start" value="2024-01-01" min="1925-01-01" max="2024-01-01" v-model="date" placeholder="Date of Birth"/>
            <input class="bg-inherit border text-white  font-bold p-4 mt-4 w-1/2"type="password" v-model="password" placeholder="Password"/>
            <div class="bg-white cursor-pointer text-slate-700 font-bold text-center p-2 mt-4 rounded-2xl w-1/2" @click="signup">Sign up</div>
        </div>
    </div>
</template>


<style scoped>

</style>