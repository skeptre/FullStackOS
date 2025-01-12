<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-900 p-6">
    <header class="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Eventitude</h1>
      <button
          @click="signOut"
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </header>

    <div class="w-full max-w-3xl mt-6">
      <h1 class="text-4xl font-bold text-center text-white mb-6">Events</h1>
      <ul class="space-y-6">
        <li
            v-for="event in events"
            :key="event.id"
            class="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 class="text-2xl font-bold">{{ event.name }}</h2>
          <p class="text-gray-400">{{ event.description }}</p>
          <router-link
              :to="`/events/${event.id}`"
              class="mt-2 inline-block text-red-400 hover:text-red-500 hover:underline"
          >
            View Details
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        { id: 1, name: 'Event One', description: 'Description for event one' },
        { id: 2, name: 'Event Two', description: 'Description for event two' },
      ],
    };
  },
  methods: {
    signOut() {
      // Clear user data and redirect to login
      alert('You have signed out.');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

ul {
  list-style: none;
  padding: 0;
}

h1, h2, p {
  margin: 0;
}
</style>