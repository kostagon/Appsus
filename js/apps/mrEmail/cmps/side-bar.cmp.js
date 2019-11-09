import '../services/util.service.js';
import readIndicator from './read-indicator.cmp.js';

import {
    eventBus
} from '../../../services/eventbus-service.js';


export default {
    name: 'side-bar',
    template: `
        <section class="email-side-bar">
            <router-link to="/email/compose"><div class="compose-btn flex justify-center align-center"><span class="plus-btn">+</span>Compose</div></router-link>
            <router-link to="/email"><div class="side-bar-item" @click="showByKey" data-key="all">Inbox <read-indicator></read-indicator></div></router-link>
            <router-link to="/email"><div class="side-bar-item" @click="showByKey" data-key="starred">Starred</div></router-link>
            <router-link to="/email"><div class="side-bar-item" @click="showByKey" data-key="sent">Sent Mails</div></router-link>
        </section>
    `,
    methods: {
        showByKey(ev) {
            let key = ev.path[0].dataset.key;
            eventBus.$emit('show-emails-by', key);
        }
    },
    components: {
        readIndicator
    }
}