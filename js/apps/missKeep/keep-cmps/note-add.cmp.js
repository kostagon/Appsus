'use strict';

export default {
    name: 'noteAdd',
    template: `
    <section class="notes-add-container">
        <input type="text" v-model="userNote" :placeholder="inputPlaceholder"></input>
        <i class="fas fa-font" @click="updateInput('Enter note here..')"></i>
        <i class="far fa-image" @click="updateInput('Enter image url..')"></i>
        <i class="fas fa-list" @click="updateInput('Enter comma separated list..')"></i>
    </section>
    `,
    data() {
        return {
            userNote: null,
            inputPlaceholder:'Enter note here..',
        }
    },
    methods:{
        updateInput(txt){
            this.inputPlaceholder = txt;
        }
    }
}