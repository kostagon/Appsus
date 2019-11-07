'use strict';

import { keepService } from '../keep-services/keep-service.js';
import noteSearch from './note-search.cmp.js';
import noteAdd from './note-add.cmp.js';
import noteTxt from './note-txt.cmp.js';
import noteImg from './note-img.cmp.js';
import noteTodo from './note-todos.cmp.js';


export default {
    name: 'noteList',
    template: `
    <section v-if="notes">
        <section class="flex space-around">
            <note-search></note-search>
        </section>

        <note-add></note-add>

        <label>Notes:</label>
        <div class="notes-container">
            <div v-for="note in notes">
                <component :is="note.type" :info="note.info"></component>
            </div>
        </div>

    </section>`,
    data() {
        return {
            notes: []
        }
    },
    created() {
        this.notes = keepService.getNotes().then(
            notes => {
                this.notes = notes;
            }
        );
    },
    components: {
        noteSearch,
        noteAdd,
        noteTxt,
        noteImg,
        noteTodo
    }
}