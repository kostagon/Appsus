'use strict';

import { keepService } from '../keep-services/keep-service.js';
import noteSearch from './note-search.cmp.js';
import noteAdd from './note-add.cmp.js';
import noteTxt from './note-types-cmps/note-txt.cmp.js';
import noteImg from './note-types-cmps/note-img.cmp.js';
import noteVid from './note-types-cmps/note-vid.cmp.js';
import noteTodo from './note-types-cmps/note-todos.cmp.js';


export default {
    name: 'noteList',
    template: `
    <section v-if="notes">
        <section class="flex space-around">
            <note-search></note-search>
        </section>

        <note-add></note-add>

        <label>Notes:</label>
        <div class="notes-container space-around">
            <div v-for="note in notes">
                <component :is="note.type" :note="note"></component>
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
        noteVid,
        noteTodo
    }
}