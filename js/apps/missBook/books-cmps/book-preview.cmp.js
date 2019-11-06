'use strict';

export default {
    name: 'book-preview',
    props: ['book'],
    template: `
        <section class="book-preview-container text-center">
            <router-link :to="bookDetailsLink">
                <img :src="book.thumbnail"/>
                <h3>{{ book.title }}</h3> 
                <p>{{book.listPrice.amount}} {{currencyIcon}}</p>
            </router-link>
        </section>
    `,
    computed: {
        currencyIcon() {
            let currencyCode = this.book.listPrice.currencyCode;
            if (currencyCode === 'EUR') return '€';
            if (currencyCode === 'ILS') return '₪';
            if (currencyCode === 'USD') return '$';
        },
        bookDetailsLink() {
            return `/book/${this.book.id}`
        }
    }
}


