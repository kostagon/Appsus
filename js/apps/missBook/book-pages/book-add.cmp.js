'use strict';

import {bookService} from '../book.service.js';
import {eventBus} from '../../../services/eventbus-service.js';

export default {
    name: 'book-add',
    template: `
    <section class="book-add-container flex column align-center justify-center">
        <h2>Search a book to add</h2>
        <form @submit.prevent="searchBook">
            <input type="search" v-model="searched"/>
            <button>Search</button>
        </form>
        <div v-if="!!results && results.length > 0" class="searched-books column flex wrap space-around align-center">
            <div v-for="result in results" class="flex space-between align-center">
                <button @click="addToBooks(result.selfLink)">+</button>
                <img v-if="!!result.volumeInfo.imageLinks" :src="result.volumeInfo.imageLinks.thumbnail"/>
                <img v-else src="https://onlinebookclub.org/book-covers/no-cover.jpg"/>
                <h5>{{result.volumeInfo.title}}</h5>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            searched: null,
            results: []
        }
    },
    methods: {
        searchBook() {
            bookService.getSearchedBooks(this.searched)
                .then(books => this.results = books)
        },
        addToBooks(bookUrl) {
            bookService.addToBooks(bookUrl)
                .then(book => {
                    const msg = {
                        txt: `${book.title} was successfully added!`,
                        type: 'success',
                        link: `/book/${book.id}`,
                        delay: 5000
                    }
                    eventBus.$emit('show-msg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: `Something went wrong! (${err})
                        Try to add a different book`,
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg);
                })
        }
    }
}


