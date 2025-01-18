<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <header class="w-full bg-black p-4">
      <h1 class="text-4xl text-red-500 text-center">Eventitude</h1>
    </header>
    <div class="bg-gray-800 p-8 rounded shadow-md w-80">
      <h2 class="text-2xl mb-6 text-center text-silver">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm mb-2">Email</label>
          <input id="email" v-model="email" type="email" required class="w-full p-2 rounded" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm mb-2">Password</label>
          <input id="password" v-model="password" type="password" required class="w-full p-2 rounded" />
        </div>
        <button class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-700">Login</button>
      </form>
      <p class="mt-4 text-center">
        Don't have an account?
        <router-link to="/register" class="text-yellow-500 hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      alert('Login successful!');
      this.$router.push('/events');
    },
  },
};
</script>