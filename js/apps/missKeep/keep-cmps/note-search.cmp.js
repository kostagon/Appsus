'use strict';

export default {
    template: `
    <section class="notes-search">
        <div class="search-container">
            <input placeholder="search notes" v-model="userInput"></input>
            <i class="fas fa-search"></i>
        </div>
        <select>
            <option>All</option>
            <option>Text</option>
            <option>Image</option>
            <option>Video</option>
            <option>List</option>
        </select>
    </section>
    `,
    data() {
        return {
            userInput: ''
        }
    },
    

}