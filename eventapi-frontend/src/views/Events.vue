<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full bg-black p-4 flex justify-between items-center">
      <h1 class="text-3xl text-red-500">Eventitude</h1>
      <button @click="signOut" class="bg-red-600 p-2 rounded hover:bg-red-700">Sign Out</button>
    </header>
    <main class="flex-grow flex flex-col items-center p-6">
      <h2 class="text-3xl mb-6">Upcoming Events</h2>
      <ul class="space-y-4 w-full max-w-lg">
        <li v-for="event in events" :key="event.id" class="p-4 bg-gray-800 rounded">
          <h3 class="text-xl text-silver">{{ event.name }}</h3>
          <p class="text-gray-400">{{ event.description }}</p>
          <router-link :to="`/events/${event.id}`" class="text-red-500 hover:underline">View Details</router-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        { id: 1, name: 'Tech Conference', description: 'A conference about the latest in tech' },
        { id: 2, name: 'Startup Meetup', description: 'Meet other startup founders' },
      ],
    };
  },
  methods: {
    signOut() {
      alert('Signed out successfully');
      this.$router.push('/login');
    },
  },
};
</script>