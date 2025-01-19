<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100">
    <!-- Navigation Bar -->
    <nav class="navbar w-full py-3 px-8 flex justify-between items-center bg-black shadow-md">
      <div class="text-xl font-bold text-silver">Eventitude</div>
      <div class="flex gap-4">
        <router-link to="/register" class="link">Register</router-link>
      </div>
    </nav>

    <!-- Login Form -->
    <div class="form-container">
      <h1 class="form-title">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" id="email" type="email" placeholder="Email Address" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" id="password" type="password" placeholder="Password" />
        </div>
        <button type="submit" class="btn btn-primary w-full mt-4">Login</button>
      </form>
      <p class="text-center mt-3 text-light-gray">
        Don't have an account? <router-link to="/register" class="text-gold hover:underline">Register</router-link>
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
      if (!email.value || !password.value) {
        alert('Please fill in both fields');
        return;
      }

      console.log('Logging in with:', email.value, password.value);
      router.push('/events');
    }

    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* Navigation Bar */
.navbar {
  font-family: 'Helvetica Neue', sans-serif;
  border-bottom: 1px solid #444;
  color: black;
  background-color: white;
}

.link {
  font-size: 0.9rem;
  color: #aaa;
  font-weight: 500;
  text-transform: uppercase;
}

.link:hover {
  color: #e63946;
}

/* Form Container */
.form-container {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  width: 400px;
  text-align: center;
  margin: 0 auto;
}

.form-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #e63946;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #ddd;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 8px;
  font-size: 1rem;
  background: #2a2a2a;
  color: #eee;
}

input::placeholder {
  color: #888;
}

input:focus {
  outline: none;
  border-color: #e63946;
  box-shadow: 0 0 4px rgba(230, 57, 70, 0.6);
}

.btn {
  font-size: 1rem;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primary {
  background: linear-gradient(90deg, #e63946, #d62828);
  color: white;
  font-weight: bold;
}

.btn-primary:hover {
  background: #b22222;
}

/* Gold Link Styling */
.text-gold {
  color: #FFD700; /* Gold */
}

.text-gold:hover {
  color: #FFC300; /* Slightly brighter gold */
}

/* Light Gray Text for Contrast */
.text-light-gray {
  color: #ccc;
}
</style>
