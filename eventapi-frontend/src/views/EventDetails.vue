<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Event Details</h1>
    <p>Event Name: {{ event.name }}</p>
    <p>Description: {{ event.description }}</p>
    <p>Location: {{ event.location }}</p>
    <p>Date: {{ event.date }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        name: 'Sample Event',
        description: 'This is a sample event description.',
        location: 'New York',
        date: '2025-01-15',
      },
    };
  },
};
</script>