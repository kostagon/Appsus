'use strict';

import { eventBus, EVENT_NOTE_FILTERED } from '../../../services/eventbus-service.js'

export default {
    template: `
    <section class="search-container">
            <input type="search" placeholder="Search notes" v-model="filter.txt" @input="updateFilter"></input>
            <i class="fas fa-search"></i>
       
        <select v-model="filter.type" @change="updateFilter">
            <option value="">All</option>
            <option value="noteTxt">Text</option>
            <option value="noteImg">Image</option>
            <option value="noteVid">Video</option>
            <option value="noteTodo">List</option>
        </select>
    </section>
    `,
    data() {
        return {
            filter: {
                txt: '',
                type: ''
            }
        }
    },
    methods: {
        updateFilter() {
            eventBus.$emit(EVENT_NOTE_FILTERED, this.filter);
        }
    }
}