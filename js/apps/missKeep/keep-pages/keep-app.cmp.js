'use strict';
import { keepService } from '../keep-services/keep-service.js';
import { eventBus, EVENT_NOTE_FILTERED } from '../../../services/eventbus-service.js';
import noteList from '../keep-cmps/note-list.cmp.js';
import noteSearch from '../keep-cmps/note-search.cmp.js';
import noteAdd from '../keep-cmps/note-add.cmp.js';

export default {
    name: 'keep-app',
    template: `
        <section class="keep-app-container container">
            <section class="flex space-around search-container">
                <note-search></note-search>
            </section>

            <note-add></note-add>
            <note-list :notes="notesToShow"></note-list>
        </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: null
        }
    },
    created() {
        this.notes = keepService.getNotes().then(
            notes => {
                this.notes = notes;
            }
        );
        eventBus.$on(EVENT_NOTE_FILTERED, filter => this.updateFilter(filter));
    },
    methods: {
        updateFilter(newFilter) {
            this.filterBy = newFilter;
        },
        // addNote(note, data) {
		// 	keepService.editNote(note, data);
        // }
    },
    computed: {
        notesToShow() {
            let notesToShow = this.notes;
            if (this.filterBy && this.filterBy.type !== '') {
                notesToShow = notesToShow.filter(note => this.filterBy.type === note.type)
            }
            if (this.filterBy && this.filterBy.txt) {
                let search = this.filterBy.txt.toLowerCase();
                notesToShow = notesToShow.filter(note => {
                    let val = '';
                    switch (note.type) {
                        case 'noteTxt':
                            val = note.info.txt;
                            break;
                        case 'noteImg':
                            val = note.info.imgUrl;
                            break;
                        case 'noteVid':
                            val = note.info.vidUrl;
                            break;
                        case 'noteTodo':
                            val = note.info.todos.map(todo => todo.txt).join(',');
                            break;
                    }
                    return val.includes(search);
                })
            }
            return notesToShow;
        }
    },
    components: {
        noteList,
        noteSearch,
        noteAdd,
    }
}