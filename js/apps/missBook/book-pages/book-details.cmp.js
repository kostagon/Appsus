'use strict';

import { bookService } from '../book.service.js';
import '../../../cmps/long-text.cmp.js';
import { eventBus } from '../../../services/eventbus-service.js';
import reviewAdd from '../books-cmps/review-add.cmp.js'

export default {
    name: 'book-details',
    template: `
        <section  v-if="book" class="book-details-container text-center flex column space-between align-center">
            <div class="navigate flex space-between align-center">
                <router-link :to="'/book/' + nearBooksIds.prev"> &lt; Prev Book</router-link>
                <router-link :to="'/book/' + nearBooksIds.next">Next Book &gt; </router-link>
            </div>
            <div class="flex space-between align-center book-details">
                <img :src="book.thumbnail"/>
                <div class="info">
                    <p class="book-condition">{{ bookCondition }}</p>
                    <h3>{{ book.title }} <span>({{ book.publishedDate }})</span></h3> 
                    <h4>{{ book.subtitle }}</h4>
                    <p>Written by: <span v-for="author in book.authors">{{author}}</span></p>
                    <p>Description: <long-text :txt="book.description"></long-text></p>
                    <p class="reading-lvl">{{ readingLvl }} <span>{{ book.pageCount }} pages</span></p>
                    <p>Language: <span>{{ book.language }}</span></p>
                    <p>Categories: <span v-for="category in book.categories">{{ category }}</span></p>
                    <p :class="priceClass"><span v-if="book.listPrice.isOnSale" class="sale">Sale! </span>{{ book.listPrice.amount }} {{ book.listPrice.currencyCode }}</p>
                </div>
            </div>
            <review-add @reviewed="addReview"></review-add>
            <div v-if="!!book.reviews && book.reviews.length > 0" class="reviews">
                <h3>Reviews</h3>
                <ul class="flex column justify-center align-center">
                    <li v-for="review in book.reviews" class="reviews flex align-center justify-center wrap">
                        <button class="remove-btn" @click="removeReview(review.id)">X</button>
                        <h4 class="name">{{review.name}}</h4>
                        <p class="info">Rate: <span>{{review.rate}}</span></p>
                        <p class="info">Read at: <span>{{review.readAt}}</span></p>
                        <p class="txt"><span>{{review.txt}}</span></p>
                    </li>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
            book: null,
            bookId: null,
            nearBooksIds: null
        }
    },
    computed: {
        readingLvl() {
            let pages = this.book.pageCount;
            if (pages > 500) return 'Long Reading';
            else if (pages > 200) return 'Decent Reading';
            else if (pages < 100) return 'Light Reading'
        },
        bookCondition() {
            let yearsPassed = new Date().getFullYear() - this.book.publishedDate;
            if (yearsPassed > 10) return 'Veteran Book';
            if (yearsPassed < 1) return 'New!';
        },
        priceClass() {
            return {
                'red': this.book.listPrice.amount > 150,
                'green': this.book.listPrice.amount < 20
            };
        }
    },
    methods: {
        loadBook() {
            this.bookId = this.$route.params.id;
            bookService.getBookById(this.bookId)
                .then(book => {
                    this.book = book;
                    this.nearBooksIds = bookService.getNearBooksIds(book.id);
                })
        },
        addReview(review) {
            bookService.addReview(this.bookId, review)
                .then(book => {
                    this.book = book
                    const msg = {
                        txt: `${review.name}, your review was successfully added!`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: `Something went wrong! (${err})`,
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg);
                })
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book, reviewId)
                .then(book => {
                    this.book = book
                    const msg = {
                        txt: `This review was successfully removed!`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: `Something went wrong! (${err})`,
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg);
                })
        }
    },
    created() {
        this.loadBook();
        window.scrollTo(0, 0);
    },
    watch: {
        '$route.params.id'() {
            this.loadBook();
        }
    },
    components: {
        reviewAdd
    }
}


