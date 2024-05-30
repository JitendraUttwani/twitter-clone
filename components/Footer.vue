<script setup>
const footerItems = ['About', 'Download the X app','Help Center','Terms of Service','Privacy Policy',
  'Cookie Policy','Accessibility','Ads info','Advertising','Blog','Careers','Brand Resources','Developers','X for Business','Marketing',
  'Directory', 'Settings'
]
</script>

<template>
  <footer class="flex flex-col gap-2 align-bottom mt-16">
    <div class="navlinks px-2 text-gray-500 text-sm flex justify-around">
      <NuxtLink to="#" v-for="(link, index) in footerItems" :key="index">{{ link }}</NuxtLink>
    </div>
    <div class="copyright mb-2 text-gray-500 text-sm flex justify-center">@ 2024 X Corp.</div>
  </footer>
</template>