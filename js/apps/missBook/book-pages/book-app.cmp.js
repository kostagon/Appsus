'use strict';

import { bookService } from '../book.service.js'

import bookFilter from '../books-cmps/book-filter.cmp.js';
import bookList from '../books-cmps/book-list.cmp.js';

export default {
    name: 'book-app',
    template: `
        <section class="book-app-container">
            <book-filter @filtered="setFilter"></book-filter> 
            <router-link to="/add" class="add-book-btn">Add Book</router-link>
            <router-view></router-view>
            <book-list :books="booksToShow" @selected="selectBook"></book-list>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
            selectedBook: null
        }
    },
    methods: {
        selectBook(bookId) {
            bookService.getBookById(bookId)
                .then(book => {
                    this.selectedBook = book
                })
        },
        setFilter(filter) {
            this.filterBy = filter;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            let regex = new RegExp(`${this.filterBy.byName}`, 'i');
            return this.books.filter(book => {
                let bookPrice = book.listPrice.amount;
                return regex.test(book.title) && bookPrice > this.filterBy.fromPrice && bookPrice < this.filterBy.toPrice
            })
        }
    },
    created() {
        bookService.getBooks()
            .then(books => this.books = books)
    },
    components: {
        bookFilter,
        bookList
    }
}