<script setup>

let text = ref('');

const postTweet = async () => {
  if (!text.value.trim()) {
    alert('Tweet cannot be empty!');
    return;
  }

  try {
    console.log('post tweet')
    const response = await useFetch('http://localhost:5000/api/v1/post', {
      method: 'POST',
      body: JSON.stringify({ message: text.value }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('token')}`,
      },
    });

    if (response.success === false) {
      alert(`Error posting tweet`);
    } else {
      alert('Tweet posted successfully!');
      text.value = '';
    }
  } catch (error) {
    console.error('Error posting tweet:', error);
    alert('Failed to post tweet. Please try again later.');
  }
};
</script>



<template>
    <div class="flex h-40 w-full">
        <div class="p-3 border-r-2 border-gray-600">
            <img src="~/assets/images/userimage.jpg" alt="" class="h-12 w-12 rounded-full">
        </div>
        <div class="flex flex-col">
            <div class="w-full h-4/6">
                <textarea rows="80" cols="100" placeholder="What is happening?" class="border-none outline-none p-1 bg-inherit w-full h-4/6" v-model="text"></textarea>
            </div>
            <div class="flex flex-row justify-between">
                <div>
                    <ul class="flex flex-row p-4 list-none gap-4 justify-between items-between">
                        <!-- <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="image" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="image-portrait" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="square-poll-vertical" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="face-smile" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="calendar-plus" />
                        <font-awesome-icon class="cursor-pointer rounded-full p-2 hover:bg-gray-800 transition-colors" icon="location-dot" /> -->
                    </ul>
                </div>
                <div @click="postTweet" class="bg-blue-500 items-center justify-center cursor-pointer text-white font-bold text-center px-2 pt-2 pb-0 h-10 mb-3 mr-2 rounded-3xl w-1/6">
                    Post
                </div>
            </div>
        </div>
    </div>
</template>