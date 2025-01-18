<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-900 p-6">
    <header class="w-full bg-black p-4 flex justify-between items-center">
      <h1 class="text-3xl text-red-500">Eventitude</h1>
      <button @click="goBack" class="bg-gray-700 p-2 rounded hover:bg-gray-800">Back</button>
    </header>
    <main class="bg-gray-800 p-6 rounded shadow-md w-2/3">
      <h2 class="text-4xl text-white">{{ event.name }}</h2>
      <p class="text-gray-300 mt-4">{{ event.description }}</p>
      <button class="bg-red-500 mt-6 p-2 rounded hover:bg-red-700">Register</button>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        name: 'Sample Event',
        description: 'Detailed description of the event.',
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push('/events');
    },
  },
};
</script>