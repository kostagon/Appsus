'use strict';

Vue.component('long-text', {
    props: ['txt'],
    template: `
        <section @click="toggleIsShort" class="long-text-container">
            <p>{{txtToShow}}</p> 
            <button v-if="!!isShort">more</button>
            <button v-if="!isShort">less</button>
        </section>
    `,
    data(){
        return {
            isShort: true
        }
    },
    methods: {
        toggleIsShort() {
            this.isShort = !this.isShort;
        }
    },
    computed: {
        txtToShow() {
            // debugger;
            if (!!this.isShort) return `${this.txt.substr(0, 100)} ...`;
            return this.txt;
        }
    }
})


