<script setup>
    const signup = () => {
        return navigateTo('/i/flow/signup')
    }
    const signin = () => {
        return navigateTo('/i/flow/login')
    }
</script>


<template>
    <div class="container h-screen w-full">
        <header class="flex flex-row w-full justify-between h-1/6"></header>
        <main class="flex flex-row w-full h-4/6">
            <div class="image justify-start w-7/12 h-4/6" >
                <img class="" src="~/assets/images/twitter-logo.jpg" />
            </div>
            <div class="login-part w-5/12 flex flex-col align-start justify-start">
                <h1 class="text-7xl font-bold">Happening now</h1>
                <h2 class="mt-7 font-bold text-3xl">Join today.</h2>
                <div class="bg-white cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="oauthGoogle">Sign up with Google</div>
                <div class="bg-white cursor-pointer text-slate-700 text-center font-bold p-2 mt-4 rounded-2xl w-1/2" @click="oauthApple">Sign up with Apple</div>
                <p class="text-center mt-2 w-1/2">------------------or-----------------</p>
                <div class="bg-blue-500 cursor-pointer text-white font-bold text-center p-2 mt-4 rounded-2xl w-1/2" @click="signup">Create account</div>
                <p class="text-gray-500 text-sm py-1 w-1/2 text-wrap">By signing up, you agree to the <a href="#" class="text-blue-500">Terms of Service</a> and <a href="#" class="text-blue-500">Privacy Policy</a>, including <a href="#" class="text-blue-500">Cookie Use</a></p>
                <h2 class="font-bold mt-3">Already have an account?</h2>
                <div class="bg-zinc-950 border-2 cursor-pointer border-blue-700 font-bold text-blue-700 text-center p-2 mt-4 rounded-2xl w-1/2" @click="signin">Sign in</div>
            </div>
        </main>
        <footer class="flex flex-col gap-2 align-bottom mt-16">
            <div class="navlinks px-2 text-gray-500 text-sm flex justify-around">
                <a href="#">About</a>&nbsp;
                <a href="#">Download the X app</a>&nbsp;
                <a href="#">Help Center</a>&nbsp;
                <a href="#">Terms of Service</a>&nbsp;
                <a href="#">Privacy Policy</a>&nbsp;
                <a href="#">Cookie Policy</a>&nbsp;
                <a href="#">Accessibility</a>&nbsp;
                <a href="#">Ads info</a>&nbsp;
                <a href="#">Blog</a>&nbsp;
                <a href="#">Careers</a>&nbsp;
                <a href="#">Brand Resources</a>&nbsp;
                <a href="#">Advertising</a>&nbsp;
                <a href="#">Marketing</a>&nbsp;
                <a href="#">X for Business</a>&nbsp;
                <a href="#">Developers</a>&nbsp;
                <a href="#">Directory</a>&nbsp;
                <a href="#">Settings</a>&nbsp;
            </div>
            <div class="copyright mb-2 text-gray-500 text-sm flex justify-center">@ 2024 X Corp.</div>
        </footer>
    </div>
</template>