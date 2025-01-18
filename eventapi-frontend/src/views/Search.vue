<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-900">
    <header class="w-full bg-black p-4 flex justify-between items-center">
      <h1 class="text-3xl text-red-500">Eventitude</h1>
      <button @click="signOut" class="bg-red-600 p-2 rounded hover:bg-red-700">Sign Out</button>
    </header>
    <main class="flex-grow flex flex-col items-center p-6">
      <h2 class="text-3xl text-silver mb-4">Search Events</h2>
      <input v-model="query" class="p-2 w-1/2 rounded mb-4" placeholder="Search..." />
      <button @click="search" class="bg-red-500 p-2 rounded hover:bg-red-700">Search</button>
      <ul v-if="results.length" class="mt-6 w-full max-w-lg space-y-4">
        <li v-for="result in results" :key="result.id" class="p-4 bg-gray-800 rounded">
          <h3 class="text-xl text-silver">{{ result.name }}</h3>
          <p class="text-gray-400">{{ result.description }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      results: [],
    };
  },
  methods: {
    search() {
      alert(`Searching for: ${this.query}`);
    },
    signOut() {
      this.$router.push('/login');
    },
  },
};
</script>