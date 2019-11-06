'use strict';

import bookPreview from './book-preview.cmp.js'

export default {
    name: 'book-list',
    props: ['books'],
    template: `
    <section class="book-list-container">
        <ul class="clean-list flex wrap justify-center align-center">
            <book-preview v-for="currBook in books" :book="currBook" @click.native="onSelectBook(currBook.id)" :key="currBook.id">
            </book-preview>
        </ul>
    </section>
    `,
    data() {
        return {
            selectedBook: null
        }
    },
    methods: {
        onSelectBook(bookId) {
            this.selectedBook = bookId;
            this.$emit('selected', this.selectedBook);
        }
    },
    components: {
        bookPreview
    }
}


