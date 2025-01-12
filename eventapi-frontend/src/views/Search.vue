<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Search Events</h1>
    <input
        v-model="query"
        type="text"
        placeholder="Search for events"
        class="w-full p-2 border rounded mb-4"
    />
    <ul class="space-y-4">
      <li
          v-for="event in filteredEvents"
          :key="event.id"
          class="bg-white shadow-md rounded p-4 hover:bg-gray-100"
      >
        <router-link :to="`/events/${event.id}`" class="text-blue-500 hover:underline">
          {{ event.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      events: [
        { id: 1, name: 'Event 1' },
        { id: 2, name: 'Event 2' },
        { id: 3, name: 'Event 3' },
      ],
    };
  },
  computed: {
    filteredEvents() {
      return this.events.filter(event =>
          event.name.toLowerCase().includes(this.query.toLowerCase())
      );
    },
  },
};
</script>