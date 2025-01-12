<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Events</h1>
    <ul class="space-y-4">
      <li
          v-for="event in events"
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
      events: [
        {id: 1, name: 'Event 1'},
        {id: 2, name: 'Event 2'},
        {id: 3, name: 'Event 3'},
      ],
    };
  },
};
</script>