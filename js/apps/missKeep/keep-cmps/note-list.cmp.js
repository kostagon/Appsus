'use strict';

import noteTxt from './note-types-cmps/note-txt.cmp.js';
import noteImg from './note-types-cmps/note-img.cmp.js';
import noteVid from './note-types-cmps/note-vid.cmp.js';
import noteTodo from './note-types-cmps/note-todos.cmp.js';


export default {
    name: 'noteList',
    props: ['notes'],
    template: `
    <section v-if="notes">
        
        <h3 v-if="pinnedNotesToShow.length > 0"> Pinned Notes </h3>
        <div v-if="pinnedNotesToShow.length > 0" class="notes-container space-around">
            <component v-for="note in pinnedNotesToShow" :is="note.type"
                :note="note">
            </component>
        </div>

        <h3 v-if="pinnedNotesToShow.length > 0"> Other Notes </h3>
            <div v-if="notesToShow" class="notes-container space-around">
                <component v-for="note in notesToShow" :is="note.type"
                    :note="note">
                </component>
            </div>

    </section>`,
    components: {
        noteTxt,
        noteImg,
        noteVid,
        noteTodo
    },
    computed: {
        pinnedNotesToShow() {
            if (!Array.isArray(this.notes)) return false;
            return this.notes.filter(note => (note.info.isPinned));
        },
        notesToShow() {
            if (!Array.isArray(this.notes)) return false;
            return this.notes.filter(note => (!note.info.isPinned));
        }
    }
}