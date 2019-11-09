'use strict';

import noteTxt from './note-types-cmps/note-txt.cmp.js';
import noteImg from './note-types-cmps/note-img.cmp.js';
import noteVid from './note-types-cmps/note-vid.cmp.js';
import noteTodo from './note-types-cmps/note-todos.cmp.js';


export default {
    name: 'noteList',
    props:['notes'],
    template: `
    <section v-if="notes">
        

        <label>Notes:</label>
        <div class="notes-container space-around">
            <div v-for="note in notes">
                <component :is="note.type" :note="note"></component>
            </div>
        </div>

    </section>`,
    components: {
        noteTxt,
        noteImg,
        noteVid,
        noteTodo
    }
}