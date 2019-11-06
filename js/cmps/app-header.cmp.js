'use strict';

export default {
    name: 'app-header',
    template: `
        <section class="app-header-container flex space-between align-center">
            <h1>AppsYuSs</h1>
            <nav>
                <router-link exact to="/">Home</router-link>
                <router-link exact to="/about">About</router-link>
                <router-link exact to="/book">Miss Books</router-link>
                <router-link exact to="/keep">Miss Keep</router-link>
                <router-link exact to="/email">Mister Email</router-link>
            </nav>
        </section>
    `
}