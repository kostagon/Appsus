'use strict';

import { keepService } from '../keep-services/keep-service.js';
import { eventBus } from '../../../services/eventbus-service.js';

export default {
    name: 'noteAdd',
    template: `
    <section class="notes-add-container">
        <form @submit.prevent="submit">
            <input type="text" class="note-input" v-model="userNote" :keyup.enter="submit" :placeholder="inputPlaceholder"></input>
            <i class="fas fa-font" @click="updateInput('Enter note here..','noteTxt')" :class="noteInputClass('noteTxt')"></i>
            <i class="far fa-image" @click="updateInput('Enter image url..','noteImg')" :class="noteInputClass('noteImg')"></i>
            <i class="fas fa-list" @click="updateInput('Enter comma separated list..','noteTodo')" :class="noteInputClass('noteTodo')"></i>
        </form>
    </section>
    `,
    data() {
        return {
            userNote: null,
            inputPlaceholder: 'Enter note here..',
            selectedInput: 'noteTxt'
        }
    },
    methods: {
        updateInput(txt, type) {
            this.inputPlaceholder = txt;
            this.selectedInput = type;
        },
        noteInputClass(type) {
            return { 'selectedInput': this.selectedInput === type }
        },
        submit() {
            if (!this.userNote) return
            var note = keepService.createNote(this.selectedInput, this.userNote);
            keepService.saveNote(note).then((note) => {
                const msg = {
                    txt: `Note Added Succefully (${note.info.id})`,
                    type: 'success'
                }
                eventBus.$emit('show-msg', msg);
            })
            this.userNote = null;
        }
    },

}