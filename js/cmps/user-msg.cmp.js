import {eventBus} from '../services/eventbus-service.js';

export default {
    template: `
        <section class="user-msg" v-if="msg" :class="msg.type">
            <button @click="close">x</button>
            <p>{{msg.txt}}</p>
            <router-link v-if="msg.link" :to="msg.link">Check it Out</router-link>
        </section>
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on('show-msg', (msg)=>{
            this.msg = msg;
            setTimeout(()=>{
                this.msg = null;
            }, 1500)
        })
    },
    methods: {
        close() {
            this.msg = null;
        }
    }
}