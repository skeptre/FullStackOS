import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Events from '../views/Events.vue';
import EventDetails from '../views/EventDetails.vue';
import Search from '../views/Search.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/events', name: 'Events', component: Events },
    { path: '/events/:id', name: 'EventDetails', component: EventDetails },
    { path: '/search', name: 'Search', component: Search },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;