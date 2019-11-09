'use strict';

export default {
    name: 'app-header',
    template: `
        <section class="app-header-container flex space-between align-center">
            <h1>AppsYuSs</h1>
            <nav class="main-nav" :class="{ open: isOpen }" @click="toggleMenu">
                <ul class="main-menu clean-list flex align-center">
                    <li>
                        <router-link exact to="/book">Miss Books</router-link>
                    </li>
                    <li>
                        <router-link exact to="/keep">Miss Keep</router-link>
                    </li>
                    <li>
                        <router-link exact to="/email">Mister Email</router-link>
                    </li>
                    <li>
                        <router-link exact to="/about">About</router-link>
                    </li>
                    <li>
                        <router-link exact to="/">Home</router-link>
                    </li>
                </ul>
            </nav>
            <button class="toggle-menu-btn fa" @click="toggleMenu"></button>
            <div class="toggle-menu-screen screen" @click="toggleMenu" :class="{ open: isOpen }"></div>
        </section>
    `,
    data(){
        return {
            isOpen:false
        }
    },
    methods:{
        toggleMenu(){
            this.isOpen = !this.isOpen;
        }
    }
}