<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100">
    <!-- Navigation Bar -->
    <nav class="navbar w-full py-3 px-8 flex justify-between items-center bg-black shadow-md">
      <div class="text-xl font-bold text-silver">Eventitude</div>
      <div class="flex gap-4">
        <router-link to="/events" class="link">Events</router-link>
        <router-link to="/search" class="link">Search</router-link>
        <button @click="signOut" class="btn btn-secondary">Sign Out</button>
      </div>
    </nav>

    <!-- Form Section -->
    <div class="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-3xl text-red-500 font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-silver mb-2">Email</label>
          <input
              v-model="email"
              id="email"
              type="email"
              placeholder="Email Address"
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-silver mb-2">Password</label>
          <input
              v-model="password"
              id="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-bold"
        >
          Login
        </button>
      </form>
      <p class="text-center mt-4 text-silver">
        Don't have an account?
        <router-link to="/register" class="text-gold hover:underline">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    function handleLogin() {
      console.log('Logging in:', email.value, password.value);
      router.push('/events');
    }

    function signOut() {
      console.log('Signing out...');
      router.push('/login');
    }

    return {
      email,
      password,
      handleLogin,
      signOut,
    };
  },
};
</script>

<style scoped>
.navbar .link {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.navbar .link:hover {
  text-decoration: underline;
}

.btn {
  background-color: #444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #666;
}

.text-gold {
  color: #ffd700;
}

.text-gold:hover {
  color: #ffcc00;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}
</style>