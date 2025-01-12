import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Events from '../views/Events.vue';
import EventDetails from '../views/EventDetails.vue';
import Search from '../views/Search.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/events', name: 'events', component: Events },
    { path: '/events/:id', name: 'eventDetails', component: EventDetails },
    { path: '/search', name: 'search', component: Search },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;