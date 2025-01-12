<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-6">Search Events</h1>
      <div class="mb-6">
        <input
            v-model="query"
            @input="searchEvents"
            type="text"
            class="w-full p-3 border rounded"
            placeholder="Search for events..."
        />
      </div>
      <ul class="space-y-4">
        <li
            v-for="event in filteredEvents"
            :key="event.id"
            class="p-4 bg-white rounded shadow-md hover:shadow-lg transition"
        >
          <h2 class="text-xl font-bold">{{ event.name }}</h2>
          <p class="text-gray-700">{{ event.description }}</p>
          <router-link
              :to="`/events/${event.id}`"
              class="mt-2 inline-block text-blue-500 hover:underline"
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
      query: '',
      events: [
        { id: 1, name: 'Event Alpha', description: 'Alpha event details' },
        { id: 2, name: 'Event Beta', description: 'Beta event details' },
      ],
    };
  },
  computed: {
    filteredEvents() {
      return this.events.filter((event) =>
          event.name.toLowerCase().includes(this.query.toLowerCase())
      );
    },
  },
  methods: {
    searchEvents() {
      // For now, we don't need additional logic here since the computed property
      // `filteredEvents` will automatically react to changes in `query`.
      console.log(`Searching for: ${this.query}`);
    },
  },
};
</script>