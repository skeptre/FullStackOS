<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-4">{{ event.name }}</h1>
      <p class="text-gray-700">{{ event.description }}</p>
      <p class="mt-4 text-gray-700">
        Location: <strong>{{ event.location }}</strong>
      </p>
      <p class="mt-2 text-gray-700">
        Date: <strong>{{ event.date }}</strong>
      </p>
      <router-link
          to="/events"
          class="mt-6 inline-block text-blue-500 hover:underline"
      >
        Back to Events
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        name: 'Sample Event',
        description: 'Detailed description of the event goes here.',
        location: 'City Hall',
        date: '2025-01-15',
      },
    };
  },
};
</script>