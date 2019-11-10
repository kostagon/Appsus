'use strict';

export default {
    name: 'book-filter',
    template: `
    <section class="book-filter-container flex justify-center align-center">
        <h2>Filter by</h2>
        <form @submit.prevent="onFilter">
            Name:
            <input type="text" placeholder="Book Name" v-model="filterBy.byName" />
            Price from: 
            <input class="number-input" type="number" v-model.number="filterBy.fromPrice" />
            <button>Filter</button>
        </form>
    </section>
    `,
    data() {
        return {
            filterBy: {byName: '', fromPrice: 0}
        }
    },
    methods: {
        onFilter() {
            let filter = {...this.filterBy};
            this.$emit('filtered', filter);
        }
    }
}