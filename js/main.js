'use strict';

import router from './routes.js'
import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js';

new Vue({
    router,
    el: '#main-app',
    template: `
    <section>
        <app-header></app-header>
        <user-msg></user-msg>
        <router-view></router-view>
    </section>
    `,
    components: {
        appHeader,
        userMsg
    }
});