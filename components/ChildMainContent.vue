<!-- components/MainContent.vue -->
<template>
  <!-- header -->
  <!-- <slot name="Header"><DefaultHeader /></slot> -->
  <slot name="header">
    <h1>This is a default header</h1>
  </slot>
  
   <main class="flex flex-row w-full h-4/6">
    <div class="image justify-start w-7/12 h-4/6">
      <img src="~/assets/images/twitter-logo.jpg" alt="Twitter Logo" />
    </div>
    <div class="login-part w-5/12 flex flex-col align-start justify-start">
      <h1 class="text-7xl font-bold">Happening now</h1>
      <h2 class="mt-7 font-bold text-3xl">Join today.</h2>
      <div class="bg-white cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="">Sign up with Google</div>
      <div class="bg-white cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="">Sign up with Apple</div>
      <p class="text-center mt-2 w-1/2">-----------------or----------------</p>
      <NuxtLink to="/i/flow/signup" class="bg-blue-500 cursor-pointer text-white font-bold text-center p-2 mt-4 rounded-2xl w-1/2">Create account</NuxtLink>
      <p class="text-gray-500 text-sm py-1 w-1/2 text-wrap">By signing up, you agree to the <NuxtLink to="#" class="text-blue-500">Terms of Service</NuxtLink> and <NuxtLink to="#" class="text-blue-500">Privacy Policy</NuxtLink>, including <NuxtLink to="#" class="text-blue-500">Cookie Use</NuxtLink></p>
      <h2 class="font-bold mt-3">Already have an account?</h2>
      <NuxtLink to="/i/flow/login" class="bg-zinc-950 border-2 cursor-pointer border-blue-700 font-bold text-blue-700 text-center p-2 mt-4 rounded-2xl w-1/2">Sign in</NuxtLink>
    </div>
    </main>

  <slot name="footer">
    <h1>This is a default footer</h1>
  </slot>

  <!-- footer -->
</template>


<script setup>


</script>
